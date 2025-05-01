import type { RefreshTokensRes } from '@/shared/api/c';

export type LoginDtoRes = RefreshTokensRes;

export type LoginDtoReq = {
  email: string;
  code: string;
};
