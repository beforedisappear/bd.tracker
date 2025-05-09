import { getUser } from './getUser';

import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';
import { queryClient } from '@/shared/config/query';

import { updateUser } from './updateUser';

import type { UpdateUserDtoReq } from '../model/types';

export const userQueries = {
  all: () => ['user'],

  getUser: () =>
    queryOptions({
      queryKey: [...userQueries.all()],
      queryFn: getUser,
      select: data => data.data,
    }),

  updateUser: () =>
    mutationOptions({
      mutationFn: (user: UpdateUserDtoReq) => updateUser(user),
      onSuccess: data => queryClient.setQueryData([...userQueries.all()], data),
    }),
};
