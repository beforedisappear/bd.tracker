import 'server-only';

import { BaseService } from './base.service';
import { prismaService } from '&/prisma';
import { userService } from './user.service';
import { mailService } from './mail.service';
import { projectService } from './project.service';

import { v4 as uuidv4 } from 'uuid';
import { getSlug } from '$/utils/getSlug';
import { ApiError } from '$/errors/apiError';

import type { Team } from '&/prisma/generated/client';
import type { CreateTeamReqDto } from '$/routeHandlers/team/types';
import type { RenameTeamReqDto } from '$/routeHandlers/team/[idOrSlug]/rename/types';

class TeamService extends BaseService {
  async getTeamByIdOrSlug(args: { idOrSlug: string }) {
    const { idOrSlug } = args;

    const team: Team = await this.getTeamByIdOrSlugWithOptions(idOrSlug);

    return team;
  }

  async getUserTeamsByUserId(args: { userId: string }) {
    const { userId } = args;

    const teams = await prismaService.team.findMany({
      where: {
        OR: [{ members: { some: { id: userId } } }, { ownerId: userId }],
      },
    });

    return teams.map(team => ({
      ...team,
      owned: team.ownerId === userId,
    }));
  }

  async getTeamMembers(args: {
    idOrSlug: string;
    userId: string;
    keyword?: string;
  }) {
    const { idOrSlug, userId, keyword } = args;

    const { inTeam: isUserInTeam, team } = await this.checkIsUserInTeam(
      idOrSlug,
      { userId, membersKeyword: keyword },
    );

    if (!isUserInTeam)
      throw ApiError.forbidden('User is not a member of this team');

    const teamMembers = [team.owner, ...team.members];

    // TODO: add sql query
    return teamMembers;
  }

  async createTeam(args: { ownerId: string; data: CreateTeamReqDto }) {
    const {
      ownerId,
      data: { name },
    } = args;

    const existingTeam = await prismaService.team.findFirst({
      where: { name },
    });

    if (existingTeam) {
      throw ApiError.conflict('A team with that name already exists');
    }

    return prismaService.team.create({
      data: {
        name,
        slug: getSlug(name),
        ownerId,
      },
    });
  }

  async renameTeam(args: {
    idOrSlug: string;
    data: RenameTeamReqDto;
    userId: string;
  }) {
    const { idOrSlug, data, userId } = args;

    const { isOwner, isAdmin, team } = await this.checkIsUserInTeam(idOrSlug, {
      userId,
    });

    //TODO: the ban on editing by the admin
    if (!isOwner && !isAdmin)
      throw ApiError.forbidden(
        'The team cannot be renamed by non-owner or non-admin',
      );

    const newSlug = getSlug(data.name);

    const updatedTeam = await prismaService.team.update({
      where: { id: team.id },
      data: { name: data.name, slug: newSlug },
    });

    return updatedTeam;
  }

  async deleteTeam(args: { idOrSlug: string; ownerId: string }) {
    const { idOrSlug, ownerId } = args;

    const { team, isOwner } = await this.checkIsUserInTeam(idOrSlug, {
      userId: ownerId,
    });

    if (!isOwner)
      throw ApiError.forbidden('The team cannot be deleted by non-owner');

    const teamCount = await prismaService.team.count({ where: { ownerId } });

    if (teamCount <= 1)
      throw ApiError.conflict('User must have at least one team');
    else if (teamCount >= 9)
      throw ApiError.conflict(`User mustn't have more than 9 teams`);

    const deletedTeam = await prismaService.team.delete({
      where: { id: team.id },
    });

    return deletedTeam;
  }

  async checkInvitationExistsByInviteeEmail(args: {
    idOrSlug: string;
    inviteeEmail: string;
    checkerId: string;
  }) {
    const { idOrSlug, inviteeEmail, checkerId } = args;

    const { isAdmin, isOwner } = await this.checkIsUserInTeam(idOrSlug, {
      userId: checkerId,
    });

    //TODO: the ban on editing by the admin
    if (!isOwner && !isAdmin)
      throw ApiError.forbidden(
        'The invitation cannot be checked by a non-owner or non-admin',
      );

    const invitation = await prismaService.teamInvitation.findFirst({
      where: {
        inviteeEmail,
        team: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      },
    });

    if (!invitation || invitation.status === 'DECLINED') return false;

    if (invitation.status === 'ACCEPTED')
      throw ApiError.conflict('User has already accepted the invitation');

    return true;
  }

  async sendInvitation(args: {
    idOrSlug: string;
    inviteeEmail: string;
    inviterId: string;
    projectIds?: string[];
  }) {
    const { idOrSlug, inviteeEmail, inviterId, projectIds = [] } = args;

    const { isOwner, isAdmin, team } = await this.checkIsUserInTeam(idOrSlug, {
      userId: inviterId,
    });

    //TODO: the ban on editing by the admin
    if (!isOwner && !isAdmin)
      throw ApiError.forbidden(
        'The invitation cannot be sent by a non-owner or non-admin',
      );

    const existingUser = await userService.findOne({ idOrEmail: inviteeEmail });

    if (projectIds.length > 0) {
      //проверка на существование проекта + запрет на добавление в чужой проект
      const allProjectsExists = await projectService.projectExists({
        ids: projectIds,
        teamId: idOrSlug,
      });

      if (!allProjectsExists) {
        throw ApiError.badRequest('One or more projects were not found');
      }
    }

    if (existingUser) {
      await prismaService.team.update({
        where: { id: team.id },
        data: {
          members: { connect: { id: existingUser.id } },
          projects:
            projectIds.length > 0
              ? { connect: projectIds.map(id => ({ id })) }
              : {},
        },
      });

      await mailService.sendNotificationOfInvitationMail({
        email: inviteeEmail,
        teamName: team.name,
      });

      return { result: 'notification' };
    }

    const token = uuidv4();
    const expSeconds = Number(process.env.TEAM_INVITATION_EXPIRATION);
    const expiresAt = new Date(Date.now() + expSeconds);

    const invitation = await prismaService.teamInvitation.create({
      data: {
        teamId: team.id,
        inviterId: inviterId,
        inviteeEmail,
        token,
        projectIds: projectIds.length > 0 ? projectIds : undefined,
        expiresAt,
      },
    });

    await mailService.sendProposalOfInvitationMail({
      email: inviteeEmail,
      teamName: team.name,
      invitationId: invitation.id,
      token,
    });

    return { result: 'proposal' };
  }

  async acceptInvitaion(args: { invitationId: string; token: string }) {
    const { invitationId, token } = args;

    const invitation = await prismaService.teamInvitation.findFirst({
      where: { AND: [{ id: invitationId }, { token }] },
    });

    if (!invitation) throw ApiError.notFound('Invitation not found');

    if (
      invitation.status === 'DECLINED' ||
      invitation.status === 'ACCEPTED' ||
      invitation.token !== token
    )
      throw ApiError.badRequest('Invitation is invalid');

    if (invitation.expiresAt < new Date()) {
      prismaService.teamInvitation
        .update({
          where: { id: invitation.id },
          data: { status: 'DECLINED' },
        })
        .then(() => {
          throw ApiError.badRequest('Invitation expired');
        });
    }

    //TODO: add default project
    prismaService.$transaction(async tx => {
      const [user] = await Promise.all([
        userService.createWithTx(tx, {
          email: invitation.inviteeEmail,
        }),
        tx.teamInvitation.update({
          where: { id: invitationId },
          data: { status: 'ACCEPTED' },
        }),
      ]);

      await tx.team.update({
        where: { id: invitation.teamId },
        data: {
          members: {
            connect: { id: user.id },
          },
          projects:
            invitation.projectIds.length > 0
              ? { connect: invitation.projectIds.map(id => ({ id })) }
              : {},
        },
      });
    });
  }

  //TODO: check permisson
  async getTeamMemberById(args: {
    idOrSlug: string;
    memberId: string;
    initiatorId: string;
  }) {
    const { idOrSlug, memberId } = args;

    const conditional = { OR: [{ id: idOrSlug }, { slug: idOrSlug }] };

    const member = await prismaService.user.findFirst({
      where: {
        AND: [
          { id: memberId },
          {
            OR: [
              { teams: { some: conditional } },
              { adminTeams: { some: conditional } },
              { ownedTeams: { some: conditional } },
            ],
          },
        ],
      },
      include: {
        adminTeams: {
          where: conditional,
          select: { id: true },
        },
        ownedTeams: {
          where: conditional,
          select: { id: true },
        },
      },
    });

    if (!member) throw ApiError.notFound('Member not found');

    const { adminTeams, ownedTeams, ...data } = member;

    return {
      ...data,
      isOwner: !!ownedTeams.length,
      isAdmin: !!adminTeams.length,
    };
  }

  //TODO: check permisson
  async removeMemberFromTeam(args: {
    idOrSlug: string;
    memberId: string;
    initiatorId: string;
  }) {
    const { idOrSlug, memberId, initiatorId } = args;

    const { team, inTeam, isAdmin, isOwner } = await this.checkIsUserInTeam(
      idOrSlug,
      { userId: memberId },
    );

    if (!inTeam) {
      throw ApiError.notFound('User is not a member of this team');
    } else if (isOwner) {
      throw ApiError.forbidden('Owner cannot be removed');
    } else if (isAdmin && team.ownerId !== initiatorId) {
      throw ApiError.forbidden('Admin cannot be removed by non-owner');
    }

    await prismaService.team.update({
      where: { id: team.id },
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
    });
  }

  async setAdmin(args: {
    idOrSlug: string;
    memberId: string;
    ownerId: string;
  }) {
    const { idOrSlug, memberId, ownerId } = args;

    const { inTeam, team } = await this.checkIsUserInTeam(idOrSlug, {
      userId: memberId,
    });

    if (!inTeam) throw ApiError.notFound('User is not a member of this team');

    if (team.ownerId !== ownerId)
      throw ApiError.forbidden('Admin cannot be appointed by a non-owner');

    await prismaService.user.update({
      where: { id: memberId },
      data: {
        adminTeams: {
          connect: { id: team.id },
        },
      },
    });
  }

  async removeAdmin(args: {
    idOrSlug: string;
    memberId: string;
    ownerId: string;
  }) {
    const { idOrSlug, memberId, ownerId } = args;

    const { inTeam, team } = await this.checkIsUserInTeam(idOrSlug, {
      userId: memberId,
    });

    if (!inTeam) throw ApiError.notFound('User is not a member of this team');

    if (team.ownerId !== ownerId)
      throw ApiError.forbidden('Admin cannot be removed by a non-owner');

    await prismaService.user.update({
      where: { id: memberId },
      data: {
        adminTeams: {
          disconnect: { id: team.id },
        },
      },
    });
  }
}

export const teamService = new TeamService();
