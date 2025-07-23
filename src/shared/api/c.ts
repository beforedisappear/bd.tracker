'use client';

import ApiClient from './api/apiClient';
// import AuthInterceptor from './interceptors/authInterceptor';
import AuthInterceptorWithQueue from './interceptors/authInterceptorWithQueue';

export type { RefreshTokensRes } from './types/types';

export const apiClient = new ApiClient();

const authInterceptor = new AuthInterceptorWithQueue(apiClient.withAuth);

apiClient.withAuth.interceptors.request.use(authInterceptor.handleRequest);
apiClient.withAuth.interceptors.response.use(
  authInterceptor.handleResponseSuccess,
  authInterceptor.handleResponseError,
);
