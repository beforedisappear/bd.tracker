import 'server-only';

import { prismaService } from '&/prisma';
import { userService } from './user.service';
import { mailService } from './mail.service';

import { getSlug } from '$/utils/getSlug';
import { ApiError } from '$/errors/apiError';

import type { CreateTeamReqDto, RenameTeamReqDto } from '$/types/team.types';
import { Team } from '&/prisma/client';

class TeamService {
  async getTeamByIdOrSlug(IdOrTeamName: string) {
    const team: Team = await this.getTeamByIdOrSlugWithOptions(IdOrTeamName);

    return team;
  }

  getUserTeamsByUserId(userId: string) {
    return prismaService.team.findMany({
      where: { OR: [{ users: { some: { id: userId } } }, { ownerId: userId }] },
    });
  }

  createTeam(ownerId: string, data: CreateTeamReqDto) {
    //TODO: check permisson

    return prismaService.team.create({
      data: { name: data.name, slug: getSlug(data.name), ownerId },
    });
  }

  async renameTeam(
    teamIdOrName: string,
    userId: string,
    data: RenameTeamReqDto,
  ) {
    //TODO: check permisson

    const team = await this.getTeamByIdOrSlugWithOptions(teamIdOrName, {
      withUsers: true,
      withOwner: true,
    });

    const isUserInTeam =
      !!team.users.find(el => el.id === userId) || team.owner.id === userId;

    if (!isUserInTeam)
      throw ApiError.forbidden('User is not a member of this team');

    const newSlug = getSlug(data.name);

    const updatedTeam = await prismaService.team.update({
      where: { id: team.id },
      data: { name: data.name, slug: newSlug },
    });

    return updatedTeam;
  }

  async deleteTeamByOwner(teamIdOrName: string, ownerId: string) {
    //TODO: add permisson

    const team = await this.getTeamByIdOrSlugWithOptions(teamIdOrName, {
      withOwner: true,
    });

    if (team.ownerId !== ownerId)
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

  async inviteUserToTeam(
    teamIdOrName: string,
    inviterId: string,
    inviteeEmail: string,
  ) {
    //TODO: check permisson
    const team = await this.getTeamByIdOrSlugWithOptions(teamIdOrName);

    const existingInvite = await prismaService.teamInvitation.findFirst({
      where: {
        teamId: team.id,
        inviteeEmail,
        status: 'PENDING',
      },
    });

    if (existingInvite) throw ApiError.conflict('User already invited');

    const expSeconds = Number(process.env.TEAM_INVITATION_EXPIRATION);
    const expiresAt = new Date(Date.now() + expSeconds);

    let inviteeId: string | null = null;

    const user = await userService.findOne(inviteeEmail);

    if (user) inviteeId = user.id; //user already registred

    const invitation = await prismaService.teamInvitation.create({
      data: {
        teamId: team.id,
        inviterId,
        ...(inviteeId ? { inviteeId } : { inviteeEmail }),
        expiresAt,
      },
    });

    mailService.sendInvitationMail({
      email: inviteeEmail,
      teamName: team.name,
      invitationId: invitation.id,
    });

    return invitation;
  }

  async respondToInvitation(invitationId: string, userId: string) {
    const invitation = await prismaService.teamInvitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation || invitation.status !== 'PENDING') {
      throw ApiError.notFound('Invitation not found');
    }

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
      //добавляем нового пользователя
      await tx.team.update({
        where: { id: invitation.teamId },
        data: { users: { connect: { id: userId } } },
      });

      //обновляем приглашение
      await tx.teamInvitation.update({
        where: { id: invitation.id },
        data: { status: 'ACCEPTED', inviteeId: userId },
      });
    });
  }

  async removeUserFromTeam(teamIdOrName: string, userId: string) {
    //TODO: check permisson
    const team = await this.getTeamByIdOrSlugWithOptions(teamIdOrName, {
      withUsers: true,
    });

    if (team.ownerId === userId) {
      throw ApiError.forbidden('Owner cannot be removed');
    }

    const isUserInTeam = !!team.users.find(user => user.id === userId);

    if (!isUserInTeam) {
      throw ApiError.notFound('User is not a member of this team');
    }

    prismaService.team.update({
      where: { id: team.id },
      data: {
        users: {
          disconnect: { id: userId },
        },
      },
    });
  }

  private async getTeamByIdOrSlugWithOptions(
    IdOrSlug: string,
    options?: { withUsers?: boolean; withOwner?: boolean },
  ) {
    const { withOwner, withUsers } = options ?? {
      withUsers: false,
      withOwner: false,
    };

    const team = await prismaService.team.findFirst({
      where: { OR: [{ id: IdOrSlug }, { slug: IdOrSlug }] },
      include: { users: withUsers, owner: withOwner },
    });

    if (!team) throw ApiError.notFound('Team not found');

    return team;
  }
}

export const teamService = new TeamService();
