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
}
