/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import { BaseService } from './base.service';
import { userService } from './user.service';

class ProjectService extends BaseService {
  async projectExists(args: { ids: string[]; teamIdOrSlug: string }) {
    const { ids, teamIdOrSlug } = args;

    const existingProjects = await prismaService.project.findMany({
      where: {
        id: { in: ids },
        team: {
          OR: [{ id: teamIdOrSlug }, { slug: teamIdOrSlug }],
        },
      },
      select: { id: true },
    });

    return existingProjects.length === ids.length;
  }

  async createProject(args: {
    teamIdOrSlug: string;
    initiatorId: string;
    name: string;
    membersIds?: string[];
  }) {
    const { teamIdOrSlug, initiatorId, name, membersIds = [] } = args;

    const { isAdmin, isOwner, team } = await this.checkIsUserInTeam(
      teamIdOrSlug,
      { userId: initiatorId },
    );

    if (!isAdmin && !isOwner) {
      throw ApiError.notFound(
        'Project cannot be created by non-admin or non-owner users',
      );
    }

    if (membersIds.length > 0) {
      //при создании проекта добавляем только участников команды
      const allTeamMembersExists = await userService.userExists({
        ids: membersIds,
        teamId: team.id,
      });

      if (!allTeamMembersExists)
        throw ApiError.badRequest('One or more team members were not found');
    }

    const project = await prismaService.$transaction(async tx => {
      const newProject = await tx.project.create({
        data: {
          name,
          teamId: team.id,
          members: {
            connect: [...membersIds.map(id => ({ id }))],
          },
        },
      });

      // Create a new board for the project
      await tx.board.create({
        data: {
          name: 'Новая доска',
          projectId: newProject.id,
          tenantId: team.id,
        },
      });

      return newProject;
    });

    return project;
  }

  async deleteProject(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id },
      include: { team: true },
    });

    if (!project) throw ApiError.notFound('Project not found');

    const teamFromProject = project.team;

    const { isAdmin, isOwner } = await this.checkIsUserInTeam(
      teamFromProject.id,
      { userId: initiatorId },
    );

    if (!isAdmin && !isOwner) {
      throw ApiError.forbidden('You are not allowed to delete this project');
    }

    const deletedProject = await prismaService.$transaction(async tx => {
      await Promise.all([
        tx.task.deleteMany({ where: { projectId: id } }),
        tx.column.deleteMany({ where: { projectId: id } }),
        tx.sticker.deleteMany({ where: { projectId: id } }),
        tx.board.deleteMany({ where: { projectId: id } }),
        tx.role.deleteMany({ where: { projectId: id } }),
        tx.project.update({
          where: { id },
          data: { members: { set: [] } },
        }),
      ]);

      return tx.project.delete({ where: { id } });
    });

    return { id: deletedProject.id };
  }

  async renameProject(args: { id: string; initiatorId: string; name: string }) {
    const { id, initiatorId, name } = args;

    const project = await prismaService.project.findUnique({
      where: { id },
      include: { team: true },
    });

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    const teamFromProject = project.team;

    const { isAdmin, isOwner } = await this.checkIsUserInTeam(
      teamFromProject.id,
      { userId: initiatorId },
    );

    if (!isAdmin && !isOwner) {
      throw ApiError.forbidden('You are not allowed to rename this project');
    }

    const renamedProject = await prismaService.project.update({
      where: { id },
      data: { name },
    });

    return renamedProject;
  }

  async getAllProjects(args: { teamIdOrSlug: string; initiatorId: string }) {
    const { teamIdOrSlug, initiatorId } = args;

    const { team, inTeam } = await this.checkIsUserInTeam(teamIdOrSlug, {
      userId: initiatorId,
    });

    if (!team) {
      throw ApiError.notFound('Team not found');
    }

    if (!inTeam) {
      throw ApiError.forbidden('You are not a member of this team');
    }

    const projects = await prismaService.project.findMany({
      where: { teamId: team.id },
      include: {
        members: true,
        boards: {
          select: { id: true },
          orderBy: { createdAt: 'asc' },
          take: 1,
        },
      },
    });

    return projects.map(project => ({
      ...project,
      firstBoardId: project.boards[0]?.id as string,
      boards: undefined, // remove boards from response since we only needed firstBoardId
    }));
  }

  async getProjectById(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id },
      include: {
        boards: true,
        team: true,
      },
    });

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    const { isAdmin, isOwner } = await this.checkIsUserInTeam(project.team.id, {
      userId: initiatorId,
    });

    if (!isAdmin && !isOwner)
      throw ApiError.forbidden('You are not allowed to get this project');

    const { team, ...res } = project;

    return res;
  }

  async addProjectMember(args: {
    projectId: string;
    userId: string;
    initiatorId: string;
  }) {
    const { projectId, userId, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id: projectId },
      include: { team: true },
    });

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    const { isAdmin, isOwner } = await this.checkIsUserInTeam(project.team.id, {
      userId: initiatorId,
    });

    if (!isAdmin && !isOwner) {
      throw ApiError.forbidden(
        'New members can only be added by admins or owners',
      );
    }

    const user = await prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    await prismaService.project.update({
      where: { id: projectId },
      data: { members: { connect: { id: userId } } },
    });

    return null;
  }

  async removeProjectMember(args: {
    projectId: string;
    memberId: string;
    initiatorId: string;
  }) {
    const { projectId, memberId, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id: projectId },
      include: { team: true, members: true },
    });

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    const { isAdmin, isOwner } = await this.checkIsUserInTeam(project.team.id, {
      userId: initiatorId,
    });

    if (!isAdmin && !isOwner) {
      throw ApiError.forbidden(
        'Project members can only be removed by admins or owners',
      );
    }

    const member = project.members.find(m => m.id === memberId);

    if (!member) {
      throw ApiError.notFound('Member not found');
    }

    await prismaService.project.update({
      where: { id: projectId },
      data: { members: { disconnect: { id: member.id } } },
    });

    return null;
  }

  async updateProjectMembers(args: {
    projectId: string;
    membersIds: string[];
    initiatorId: string;
  }) {
    const { projectId, membersIds, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id: projectId },
      include: { team: true },
    });

    if (!project) throw ApiError.notFound('Project not found');

    const { isAdmin, isOwner } = await this.checkIsUserInTeam(project.team.id, {
      userId: initiatorId,
    });

    if (!isAdmin && !isOwner) {
      throw ApiError.forbidden('You are not allowed to update this project');
    }

    await prismaService.project.update({
      where: { id: projectId },
      data: { members: { set: membersIds.map(id => ({ id })) } },
    });

    return null;
  }

  async getProjectMembers(args: {
    projectId: string;
    initiatorId: string;
    keyword?: string;
  }) {
    const { projectId, initiatorId, keyword } = args;

    const project = await prismaService.project.findUnique({
      where: { id: projectId },
      include: {
        team: true,
        members: {
          where: keyword
            ? {
                OR: [
                  { name: { contains: keyword, mode: 'insensitive' } },
                  { email: { contains: keyword, mode: 'insensitive' } },
                ],
              }
            : undefined,
        },
      },
    });

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    const [{ isAdmin, isOwner }, { inProject }] = await Promise.all([
      this.checkIsUserInTeam(project.team.id, {
        userId: initiatorId,
      }),
      this.checkIsUserInProject(project.id, {
        userId: initiatorId,
      }),
    ]);

    if (!inProject && !isAdmin && !isOwner)
      throw ApiError.forbidden('You are not allowed to get this project');

    return project.members;
  }
}

export const projectService = new ProjectService();
