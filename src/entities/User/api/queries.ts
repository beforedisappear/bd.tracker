import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstackQuery';
import { queryClient } from '@/shared/config/query';

import { getUserRequest } from './getUser';
import { updateUserRequest } from './updateUser';
import { changeEmailRequest } from './changeEmail';

import type { PostChangeEmailDtoReq, UpdateUserDtoReq } from '../model/types';

export namespace userQueries {
  const all = () => ['user'];

  export const getUser = () =>
    queryOptions({
      queryKey: [...all()],
      queryFn: getUserRequest,
      select: res => res.data,
    });

  export const updateUser = () =>
    mutationOptions({
      mutationFn: (user: UpdateUserDtoReq) => updateUserRequest(user),
      onSuccess: data => queryClient.setQueryData([...all()], data),
    });

  export const changeEmail = () =>
    mutationOptions({
      mutationFn: (dto: PostChangeEmailDtoReq) => changeEmailRequest(dto),
    });
}
