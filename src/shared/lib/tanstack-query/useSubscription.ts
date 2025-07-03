'use client';

import { useSocket } from '../websocket';
import { useQueryClient, QueryKey } from '@tanstack/react-query';

export function useSubscription<T = unknown, M = unknown>(
  queryKey: QueryKey,
  updater: (oldData: T | undefined, socketMessage: M) => T,
) {
  const queryClient = useQueryClient();

  const socket = useSocket({
    onMessage: (message: string) => {
      try {
        const data = JSON.parse(message) as M;
        queryClient.setQueryData<T>(queryKey, oldData => {
          return updater(oldData, data);
        });
      } catch (error) {
        console.error('Failed to parse message', error);
      }
    },
  });

  return socket;
}
