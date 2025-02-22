import { mutationOptions } from '@/shared/lib/tanstack-query';

import { logout } from './logout';

import type { LogoutDto } from '$/types';

export const queries = {
  logout: () =>
    mutationOptions({
      mutationKey: ['logout'],
      mutationFn: (data: LogoutDto) => logout(data),
    }),
};
