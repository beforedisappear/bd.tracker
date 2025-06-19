import { useQuery } from '@tanstack/react-query';

import { useTenant } from '@/shared/lib/navigation';

import { teamQueries } from '../api';

export function useTeamAccess() {
  const tenant = useTenant();

  const { data, isLoading } = useQuery(
    teamQueries.getHaveAccessToTeam({ idOrSlug: tenant }),
  );

  const isEnoughAccess = !!(data?.isOwner || data?.isAdmin);

  return {
    isEnoughAccess,
    isOwner: data?.isOwner,
    isAdmin: data?.isAdmin,
    isLoading,
  };
}
