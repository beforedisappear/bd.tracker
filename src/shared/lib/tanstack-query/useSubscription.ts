'use client';

import { queryClient } from '@/shared/config/query';
import { useSocket } from '../websocket';
import type { QueryKey } from '@tanstack/react-query';

export function useSubscription<T = unknown, M = unknown>(
  queryKey: QueryKey,
  updater: (oldData: T | undefined, socketMessage: M) => T,
) {
  const socket = useSocket({
    onMessage: (message: string) => {
      try {
        const data = JSON.parse(message) as M;
        queryClient.setQueryData<T>(queryKey, oldData =>
          updater(oldData, data),
        );
      } catch (error) {
        console.error('Failed to parse message', error);
      }
    },
  });

  return socket;
}
