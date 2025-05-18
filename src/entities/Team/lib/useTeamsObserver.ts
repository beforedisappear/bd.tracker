import { queryClient } from '@/shared/config/query';
import { QueryObserver } from '@tanstack/react-query';
import { teamQueries } from '../api/queries';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';
import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { Team } from '../models/types';

/**
 * experimental feature
 */

export function useTeamsObserver() {
  const setTeamIdBySlugMap = usePrivateGlobalStore(
    state => state.setTeamIdBySlugMap,
  );

  useEffect(() => {
    const observer = new QueryObserver(queryClient, {
      queryKey: teamQueries.userTeamList(),
    });

    observer.subscribe(result => {
      if (result.status === 'success' && result.data) {
        const response = result.data as AxiosResponse<Team[]>;

        const map = Object.fromEntries(response.data.map(t => [t.slug, t.id]));

        setTeamIdBySlugMap(map);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
