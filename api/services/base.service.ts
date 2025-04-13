import { ApiError } from '$/errors/apiError';
import { prismaService } from '&/prisma';

export class BaseService {
  protected async getTeamByIdOrSlugWithOptions(
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

  protected async checkIsUserInTeam(
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
