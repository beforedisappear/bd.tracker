'use client';

import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  saveJwt,
  removeJwt,
} from '../lib/cookies';
import { REQUEST_TIMEOUT } from './constants';
import type { RefreshTokensResponse } from '$/types';

type Refresh = Promise<AxiosResponse<RefreshTokensResponse>>;

class ApiClient {
  public withAuth: AxiosInstance;
  public noAuth: AxiosInstance;
  private refreshPromise: Refresh | null = null;

  constructor(baseURL: string) {
    this.noAuth = axios.create({
      baseURL,
      timeout: REQUEST_TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    });

    this.withAuth = axios.create({
      baseURL,
      timeout: REQUEST_TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    });

    this.initializeInterceptors();
  }

  private async refreshTokens(
    refreshToken: RefreshTokensResponse['refreshToken'],
  ) {
    const response = await this.noAuth.post<RefreshTokensResponse>(
      `/refresh-tokens`,
      {
        refreshToken,
      },
    );

    if (response.data) {
      saveJwt(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  }

  private clearPromise() {
    this.refreshPromise = null;
  }

  private initializeInterceptors() {
    this.withAuth.interceptors.request.use(async config => {
      const accessToken = getAccessToken();
      if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.withAuth.interceptors.response.use(
      config => config,
      async error => {
        const originalReq = error.config;

        if (error.response?.status === 401 && !originalReq?._isRetry) {
          originalReq._isRetry = true;
          try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) throw new Error('ERROR_TOKEN_RECEIVING');

            if (!this.refreshPromise) {
              this.refreshPromise = this.refreshTokens(refreshToken).finally(
                () => this.clearPromise(),
              );
            }

            await this.refreshPromise;
            return this.withAuth(originalReq);
          } catch {
            removeJwt();
          }
        }
        return Promise.reject(error);
      },
    );
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);

export default ApiClient;
