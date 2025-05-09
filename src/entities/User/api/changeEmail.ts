import { apiClient } from '@/shared/api/c';

import type {
  PostChangeEmailDtoReq,
  PostChangeEmailDtoRes,
} from '../model/types';

export const changeEmail = (dto: PostChangeEmailDtoReq) => {
  return apiClient.withAuth.post<PostChangeEmailDtoRes>(
    '/profile/email/send-change-request',
    dto,
  );
};
