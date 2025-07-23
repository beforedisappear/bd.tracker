import { useQuery } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';

import { teamQueries } from '../api';

type Args = {
  users?: { id: string }[] | null | undefined;
};

export function useTeamAccess(args: Args = {}) {
  const { users = [] } = args;

  const tenant = useTenant();

  const { data, isLoading } = useQuery(
    teamQueries.getHaveAccessToTeam({ idOrSlug: tenant }),
  );

  const isEnoughAccess = !!(data?.isOwner || data?.isAdmin);

  const isMember = users?.some(user => data?.userId === user.id) || false;

  return {
    ...(users &&
      users.length > 0 && {
        isEnoughAccessAsMember: !!(data?.isOwner || data?.isAdmin || isMember),
        isMember: users?.some(user => data?.userId === user.id) || false,
      }),
    isEnoughAccess,
    isOwner: data?.isOwner,
    isAdmin: data?.isAdmin,
    userId: data?.userId,
    isLoading,
  };
}
