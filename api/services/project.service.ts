import { ApiError } from '$/errors/apiError';
import { prismaService } from '&/prisma';
import { BaseService } from './base.service';
import { userService } from './user.service';

class ProjectService extends BaseService {
  async projectExists(args: { ids: string[]; teamId: string }) {
    const { ids, teamId } = args;

    const existingProjects = await prismaService.project.findMany({
      where: { id: { in: ids }, teamId },
      select: { id: true },
    });

    return existingProjects.length === ids.length;
  }

  //TODO: add permisson
  async createProject(args: {
    teamId: string;
    creatorId: string;
    name: string;
    memberIds?: string[];
  }) {
    const { teamId, creatorId, name, memberIds = [] } = args;

    const { inTeam } = await this.checkIsUserInTeam(teamId, {
      userId: creatorId,
    });

    if (!inTeam) {
      throw ApiError.notFound(
        `A project cannot be added to someone else's team.`,
      );
    }

    if (memberIds.length > 0) {
      //при создании проекта добавляем только участников команды
      const allTeamMembersExists = await userService.userExists({
        ids: memberIds,
        teamId,
      });

      if (!allTeamMembersExists) {
        throw ApiError.badRequest('One or more team members were not found');
      }
    }

    const project = await prismaService.project.create({
      data: {
        name,
        teamId,
        members:
          memberIds.length > 0
            ? { connect: memberIds.map(id => ({ id })) }
            : {},
      },
    });

    return project;
  }

  async getProjectMembers() {}
}

export const projectService = new ProjectService();
