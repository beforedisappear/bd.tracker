'use client';

import { queryClient } from '@/shared/config/query';
import { useSocket } from '../websocket';
import type { QueryFilters, QueryKey } from '@tanstack/react-query';

type KeyArgs<T, M> = {
  queryKeyType: 'queryKey';
  queryKey: QueryKey;
  updater: (oldData: T | undefined, socketMessage: M) => T;
};

type FilterArgs<T, M> = {
  queryKeyType: 'queryFilters';
  queryKey: QueryFilters<T, Error, T, readonly unknown[]>;
  updater: (oldData: T | undefined, socketMessage: M) => T;
};

export function useSubscription<T = unknown, M = unknown>(
  args: KeyArgs<T, M> | FilterArgs<T, M>,
) {
  const { queryKeyType, queryKey, updater } = args;

  const socket = useSocket({
    onMessage: (message: string) => {
      try {
        const data = JSON.parse(message) as M;

        if (queryKeyType === 'queryKey') {
          queryClient.setQueryData<T>(queryKey, oldData =>
            updater(oldData, data),
          );
        } else {
          queryClient.setQueriesData<T>(queryKey, oldData =>
            updater(oldData, data),
          );
        }
      } catch (error) {
        console.error('Failed to parse message', error);
      }
    },
  });

  return socket;
}
