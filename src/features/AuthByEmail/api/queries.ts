import { mutationOptions } from '@/shared/lib/tanstack-query';

import { auth } from './auth';
import { login } from './login';

import type { AuthDtoReq, LoginDtoReq } from './types';

export const queries = {
  auth: () =>
    mutationOptions({
      mutationKey: ['auth'],
      mutationFn: (data: AuthDtoReq) => auth(data),
    }),
  login: () =>
    mutationOptions({
      mutationKey: ['login'],
      mutationFn: (data: LoginDtoReq) => login(data),
    }),
};
