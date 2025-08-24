import { mutationOptions } from '@/shared/lib/tanstackQuery';

import { authRequest } from './auth';
import { loginRequest } from './login';

import type { AuthDtoReq, LoginDtoReq } from '../model/types';

export namespace authQueries {
  export const auth = () =>
    mutationOptions({
      mutationKey: ['auth'],
      mutationFn: (data: AuthDtoReq) => authRequest(data),
    });
  export const login = () =>
    mutationOptions({
      mutationKey: ['login'],
      mutationFn: (data: LoginDtoReq) => loginRequest(data),
    });
}
