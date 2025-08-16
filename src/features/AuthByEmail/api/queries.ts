import { mutationOptions } from '@/shared/lib/tanstackQuery';

import { auth } from './auth';
import { login } from './login';

import type { AuthDtoReq, LoginDtoReq } from '../model/types';

export const authQueries = {
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
