'use client';

import { isObject } from '@/shared/lib/type-guards';
import { useSubscription } from '@/shared/lib/tanstack-query';
import type { QueryFilters, QueryKey } from '@tanstack/react-query';

import type { ZodSchema, z } from 'zod';

type KeyArgs<T extends ZodSchema, TData> = {
  schema: T;
  queryKeyType: 'queryKey';
  queryKey: QueryKey;
  updater: (socketMessageData: z.infer<T>['data']) => (oldData: TData) => TData;
  onComplete?: (id: string) => void;
};

type FilterArgs<T extends ZodSchema, TData> = {
  schema: T;
  queryKeyType: 'queryFilters';
  queryKey: QueryFilters<unknown, Error, unknown, readonly unknown[]>;
  updater: (
    socketMessageData: z.infer<T>['data'],
  ) => ((oldData: TData) => TData) | null;
  onComplete?: (id: string) => void;
};

export const useBoardSubscription = <T extends ZodSchema, TData = unknown>(
  args: KeyArgs<T, TData> | FilterArgs<T, TData>,
) => {
  const { schema, queryKey, queryKeyType, updater, onComplete } = args;

  const handleUpdate = (oldData: unknown, socketMessage: unknown) => {
    const result = schema.safeParse(socketMessage);

    //FIXME: для большей надежности следует добавить схемы для данных в socketMessage
    if (result.success && isObject(result.data?.data)) {
      const newData = updater(result.data.data)?.(oldData as TData);

      if (onComplete) onComplete(result.data.data.id);

      return newData;
    }

    return oldData;
  };

  const hookArgs =
    queryKeyType === 'queryKey'
      ? {
          queryKeyType: 'queryKey' as const,
          queryKey,
          updater: handleUpdate,
        }
      : {
          queryKeyType: 'queryFilters' as const,
          queryKey,
          updater: handleUpdate,
        };

  const socket = useSubscription(hookArgs);

  return socket;
};
