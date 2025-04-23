import { mutationOptions } from '@/shared/lib/tanstack-query';

import { logout } from './logout';

import type { LogoutDtoReq } from '../model/types';

export const logoutQueries = {
  logout: () =>
    mutationOptions({
      mutationKey: ['logout'],
      mutationFn: (data: LogoutDtoReq) => logout(data),
    }),
};
