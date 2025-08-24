import { queryClient } from '@/shared/config/query';
import { mutationOptions } from '@/shared/lib/tanstackQuery';

import { logoutRequest } from './logout';

import type { LogoutDtoReq } from '../model/types';

export namespace logoutQueries {
  export const logout = () =>
    mutationOptions({
      mutationKey: ['logout'],
      mutationFn: (data: LogoutDtoReq) => logoutRequest(data),
      onSuccess: () => queryClient.clear(),
    });
}
