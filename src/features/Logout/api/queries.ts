import { mutationOptions } from '@/shared/lib/tanstack-query';

import { logout } from './logout';

import type { LogoutDtoReq } from './types';

export const queries = {
  logout: () =>
    mutationOptions({
      mutationKey: ['logout'],
      mutationFn: (data: LogoutDtoReq) => logout(data),
    }),
};
