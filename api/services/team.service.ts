import 'server-only';

import { prismaService } from '&/prisma';
import { userService } from './user.service';
import { mailService } from './mail.service';

import { v4 as uuidv4 } from 'uuid';
import { getSlug } from '$/utils/getSlug';
import { ApiError } from '$/errors/apiError';

import type { Team } from '&/prisma/generated/client';
import type { CreateTeamReqDto } from '$/routeHandlers/team/types';
import type { RenameTeamReqDto } from '$/routeHandlers/team/[idOrSlug]/rename/types';

class TeamService {
  async getTeamByIdOrSlug(args: { idOrSlug: string }) {
    const { idOrSlug } = args;

    const team: Team = await this.getTeamByIdOrSlugWithOptions(idOrSlug);

    return team;
  }

  getUserTeamsByUserId(args: { userId: string }) {
    const { userId } = args;

    return prismaService.team.findMany({
      where: {
        OR: [{ members: { some: { id: userId } } }, { ownerId: userId }],
      },
    });
  }

  async getTeamMembers(args: {
    idOrSlug: string;
    userId: string;
    keyword?: string;
  }) {
    const { idOrSlug, userId, keyword } = args;

    const { inTeam: isUserInTeam, team } = await this.checkIsUserInTeam(
      idOrSlug,
      { userId },
    );

    if (!isUserInTeam)
      throw ApiError.forbidden('User is not a member of this team');

    return team.members.filter(member => {
      const email = member.email?.toLowerCase() || '';
      const name = member.name?.toLowerCase() || '';
      const lowerKeyword = keyword?.toLowerCase() || '';

      return name.includes(lowerKeyword) || email.includes(lowerKeyword);
    });
  }

  createTeam(args: { ownerId: string; data: CreateTeamReqDto }) {
    const { ownerId, data } = args;

    return prismaService.team.create({
      data: { name: data.name, slug: getSlug(data.name), ownerId },
    });
  }

  async renameTeam(args: {
    idOrSlug: string;
    data: RenameTeamReqDto;
    userId: string;
  }) {
    const { idOrSlug, userId, data } = args;

    const { isOwner, team } = await this.checkIsUserInTeam(idOrSlug, {
      userId,
    });

    if (!isOwner)
      throw ApiError.forbidden('The team cannot be renamed by non-owner');

    const newSlug = getSlug(data.name);

    const updatedTeam = await prismaService.team.update({
      where: { id: team.id },
      data: { name: data.name, slug: newSlug },
    });

    return updatedTeam;
  }

  async deleteTeamByOwner(args: { idOrSlug: string; ownerId: string }) {
    const { idOrSlug, ownerId } = args;

    const { team, isOwner } = await this.checkIsUserInTeam(idOrSlug, {
      userId: ownerId,
    });

    if (isOwner)
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

  //TODO: check permisson
  async checkInvitationExistsByInviteeEmail(args: {
    idOrSlug: string;
    inviteeEmail: string;
    checkerId: string;
  }) {
    const { idOrSlug, inviteeEmail, checkerId } = args;

    const { inTeam: isCheckerInTeam } = await this.checkIsUserInTeam(idOrSlug, {
      userId: checkerId,
    });

    if (!isCheckerInTeam)
      throw ApiError.forbidden(
        'You are not allowed to check invitations for this team',
      );

    const invitation = await prismaService.teamInvitation.findFirst({
      where: {
        inviteeEmail,
        team: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      },
    });

    if (!invitation) return false;

    if (invitation.status === 'ACCEPTED')
      throw ApiError.conflict('User has already accepted the invitation');

    return true;
  }

  //TODO: check permisson
  async sendInvitation(args: {
    idOrSlug: string;
    inviteeEmail: string;
    inviterId: string;
  }) {
    const { idOrSlug, inviteeEmail, inviterId } = args;

    const { inTeam: isInviterInTeam, team } = await this.checkIsUserInTeam(
      idOrSlug,
      { userId: inviterId },
    );

    if (!isInviterInTeam)
      throw ApiError.forbidden(
        'You are not allowed to send invitations from this team',
      );

    const existingUser = await userService.findOne(inviteeEmail);

    if (existingUser) {
      await prismaService.team.update({
        where: { id: team.id },
        data: {
          members: {
            connect: { id: existingUser.id },
          },
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

    console.log('teamWithMember', member);

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

  private async getTeamByIdOrSlugWithOptions(
    idOrSlug: string,
    options?: {
      withMembers?: boolean;
      withOwner?: boolean;
      withAdmins?: boolean;
      keyword?: string;
    },
  ) {
    const { withOwner, withMembers, withAdmins } = options ?? {
      withMembers: false,
      withOwner: false,
      withAdmins: false,
    };

    const team = await prismaService.team.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      include: { members: withMembers, owner: withOwner, admins: withAdmins },
    });

    if (!team) throw ApiError.notFound('Team not found');

    return team;
  }

  private async checkIsUserInTeam(
    idOrSlug: string,
    options: { userId: string },
  ) {
    const { userId } = options;

    const team = await this.getTeamByIdOrSlugWithOptions(idOrSlug, {
      withAdmins: true,
      withMembers: true,
      withOwner: true,
    });

    if (!team) throw ApiError.notFound('Team not found');

    const isMember = team.members.some(member => member.id === userId);
    const isOwner = team.owner.id === userId;
    const isAdmin = team.admins.some(admin => admin.id === userId);

    return {
      inTeam: isMember || isOwner || isAdmin,
      isMember,
      isAdmin,
      isOwner,
      team,
    };
  }
}

export const teamService = new TeamService();
