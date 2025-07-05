'use client';

import { isObject } from '@/shared/lib/type-guards';
import { useSubscription } from '@/shared/lib/tanstack-query';
import { type QueryKey } from '@tanstack/react-query';

import type { ZodSchema, z } from 'zod';

interface Args<T extends ZodSchema, TData = unknown> {
  schema: T;
  queryKey: QueryKey;
  updater: (socketMessageData: z.infer<T>['data']) => (oldData: TData) => TData;
  onComplete?: (id: string) => void;
}

export const useBoardSubscription = <T extends ZodSchema, TData = unknown>(
  args: Args<T, TData>,
) => {
  const { schema, queryKey, updater, onComplete } = args;

  const handleUpdate = (oldData: unknown, socketMessage: unknown) => {
    const result = schema.safeParse(socketMessage);

    //FIXME: для большей надежности следует добавить схемы для данных в socketMessage
    if (result.success && isObject(result.data?.data)) {
      const newData = updater(result.data.data)(oldData as TData);

      if (onComplete) onComplete(result.data.data.id);

      return newData;
    }

    return oldData;
  };

  const socket = useSubscription(queryKey, handleUpdate);

  return socket;
};
