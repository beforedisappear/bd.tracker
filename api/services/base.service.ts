import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';

export class BaseService {
  protected async getTeamByIdOrSlugWithOptions(
    idOrSlug: string,
    options?: {
      withMembers?: boolean;
      withOwner?: boolean;
      withAdmins?: boolean;
      membersKeyword?: string;
    },
  ) {
    const { withOwner, withMembers, withAdmins, membersKeyword } = options ?? {
      withMembers: false,
      withOwner: false,
      withAdmins: false,
      membersKeyword: undefined,
    };

    const team = await prismaService.team.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      include: {
        members: withMembers
          ? {
              where: membersKeyword
                ? { name: { contains: membersKeyword, mode: 'insensitive' } }
                : undefined,
            }
          : undefined,
        owner: withOwner,
        admins: withAdmins,
      },
    });

    if (!team) throw ApiError.notFound('Team not found');

    return team;
  }

  protected async getProjectByIdOrSlugWithOptions(
    id: string,
    options: {
      withMembers?: boolean;
      membersKeyword?: string;
    },
  ) {
    const { withMembers, membersKeyword } = options ?? {
      withMembers: false,
      membersKeyword: undefined,
    };

    const project = await prismaService.project.findFirst({
      where: { id },
      include: {
        members: withMembers
          ? {
              where: membersKeyword
                ? { name: { contains: membersKeyword, mode: 'insensitive' } }
                : undefined,
            }
          : undefined,
        team: true,
      },
    });

    if (!project) throw ApiError.notFound('Project not found');

    return project;
  }

  protected async checkIsUserInTeam(
    idOrSlug: string,
    options: { userId: string; membersKeyword?: string },
  ) {
    const { userId, membersKeyword } = options;

    const team = await this.getTeamByIdOrSlugWithOptions(idOrSlug, {
      withAdmins: true,
      withMembers: true,
      withOwner: true,
      membersKeyword,
    });

    if (!team) throw ApiError.notFound('Team not found');

    const isOwner = team.owner.id === userId;
    const isMember =
      team.members.some(member => member.id === userId) || isOwner;
    const isAdmin = team.admins.some(admin => admin.id === userId);

    return {
      inTeam: isMember || isOwner || isAdmin,
      isMember,
      isAdmin,
      isOwner,
      team,
    };
  }

  protected async checkIsUserInProject(
    idOrSlug: string,
    options: { userId: string; membersKeyword?: string },
  ) {
    const { userId, membersKeyword } = options;

    const project = await this.getProjectByIdOrSlugWithOptions(idOrSlug, {
      withMembers: true,
      membersKeyword,
    });

    if (!project) throw ApiError.notFound('Project not found');

    const isMember = project.members.some(member => member.id === userId);

    return {
      inProject: isMember,
      team: project.team,
      project,
    };
  }
}
