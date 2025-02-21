'use client';

import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  saveJwt,
  removeJwt,
} from '../lib/cookies';
import type { JWT } from './types';

class ApiClient {
  public axiosWithAuth: AxiosInstance;
  public axiosNoAuth: AxiosInstance;
  private refreshPromise: Promise<AxiosResponse<JWT>> | null = null;

  constructor(baseURL: string) {
    this.axiosNoAuth = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });

    this.axiosWithAuth = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });

    this.initializeInterceptors();
  }

  private async refreshTokens(refreshToken: JWT['refreshToken']) {
    const response = await this.axiosNoAuth.post<JWT>(`/refreshTokens`, {
      refreshToken,
    });

    if (response.data) {
      saveJwt(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  }

  private clearPromise() {
    this.refreshPromise = null;
  }

  private initializeInterceptors() {
    this.axiosWithAuth.interceptors.request.use(async config => {
      const accessToken = getAccessToken();
      if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.axiosWithAuth.interceptors.response.use(
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
            return this.axiosWithAuth(originalReq);
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
