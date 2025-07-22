import {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import {
  getAccessToken,
  getRefreshToken,
  saveJwt,
  removeJwt,
} from '../../lib/cookies';

import type { RefreshTokensRes } from '../types';

export class AuthInterceptor {
  private refreshPromise: Promise<RefreshTokensRes> | null = null;

  constructor(private axiosInstance: AxiosInstance) {}

  public handleRequest = (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  public handleResponseSuccess = (response: AxiosResponse) => response;

  public handleResponseError = async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _isRetry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._isRetry) {
      return Promise.reject(error);
    }

    originalRequest._isRetry = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      this.onAuthFail();
      return Promise.reject(error);
    }

    try {
      if (!this.refreshPromise) {
        this.refreshPromise = this.refreshTokens(refreshToken)
          .then(res => res)
          .finally(() => this.clearPromise());
      }

      await this.refreshPromise;

      return this.axiosInstance(originalRequest);
    } catch (e) {
      this.onAuthFail();
      return Promise.reject(e);
    }
  };

  private async refreshTokens(refreshToken: RefreshTokensRes['refreshToken']) {
    const response = await this.axiosInstance
      .post<RefreshTokensRes>(`/refresh-tokens`, { refreshToken })
      .then(res => res.data);

    if (response) {
      saveJwt(response.accessToken, response.refreshToken);
    }

    return response;
  }

  private clearPromise() {
    this.refreshPromise = null;
  }

  private onAuthFail() {
    removeJwt();
    window.location.reload();
  }
}
