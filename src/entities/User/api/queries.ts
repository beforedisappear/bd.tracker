import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstackQuery';
import { queryClient } from '@/shared/config/query';

import { getUser } from './getUser';
import { updateUser } from './updateUser';
import { changeEmail } from './changeEmail';

import type { PostChangeEmailDtoReq, UpdateUserDtoReq } from '../model/types';

export const userQueries = {
  all: () => ['user'],

  getUser: () =>
    queryOptions({
      queryKey: [...userQueries.all()],
      queryFn: getUser,
      select: res => res.data,
    }),

  updateUser: () =>
    mutationOptions({
      mutationFn: (user: UpdateUserDtoReq) => updateUser(user),
      onSuccess: data => queryClient.setQueryData([...userQueries.all()], data),
    }),

  changeEmail: () =>
    mutationOptions({
      mutationFn: (dto: PostChangeEmailDtoReq) => changeEmail(dto),
    }),
};
