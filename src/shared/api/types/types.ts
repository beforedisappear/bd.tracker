import type { InternalAxiosRequestConfig } from 'axios';

export type RefreshTokensRes = {
  refreshToken: string;
  accessToken: string;
  exp: Date;
};

export type AxiosReqConfigWithRetry = InternalAxiosRequestConfig & {
  _isRetry?: boolean;
};
