'use client';

import { useSubscription } from '@/shared/lib/tanstack-query';
import { type QueryKey } from '@tanstack/react-query';

import type { ZodSchema } from 'zod';

interface Args {
  schema: ZodSchema;
  queryKey: QueryKey;
  updater: (oldData: unknown, socketMessage: unknown) => unknown;
}

export const useBoardSubscription = (args: Args) => {
  const { schema, queryKey, updater } = args;

  const handleUpdate = (oldData: unknown, socketMessage: unknown) => {
    const result = schema.safeParse(socketMessage);
    if (result.success) {
      return updater(oldData, result.data);
    }
    return oldData;
  };

  const socket = useSubscription(queryKey, handleUpdate);

  return socket;
};
