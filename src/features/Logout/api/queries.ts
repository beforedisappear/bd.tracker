import { queryClient } from '@/shared/config/query';
import { mutationOptions } from '@/shared/lib/tanstackQuery';

import { logout } from './logout';

import type { LogoutDtoReq } from '../model/types';

export const logoutQueries = {
  logout: () =>
    mutationOptions({
      mutationKey: ['logout'],
      mutationFn: (data: LogoutDtoReq) => logout(data),
      onSuccess: () => queryClient.clear(),
    }),
};
