import { mutationOptions } from '@/shared/lib/tanstack-query';

import { auth } from './auth';
import { login } from './login';

import type { AuthDto, LoginDto } from '$/types';

export const queries = {
  auth: () =>
    mutationOptions({
      mutationKey: ['auth'],
      mutationFn: (data: AuthDto) => auth(data),
    }),
  login: () =>
    mutationOptions({
      mutationKey: ['login'],
      mutationFn: (data: LoginDto) => login(data),
    }),
};
