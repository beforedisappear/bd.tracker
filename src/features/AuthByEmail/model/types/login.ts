import { RefreshTokensRes } from '@/shared/api';

export type LoginDtoRes = RefreshTokensRes;

export type LoginDtoReq = {
  email: string;
  code: string;
};
