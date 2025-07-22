import AuthInterceptor from './authInterceptor';

import { AxiosError, type AxiosResponse } from 'axios';

import { getRefreshToken } from '../../lib/cookies';
import type { AxiosReqConfigWithRetry } from '../types';

export default class AuthInterceptorWithQueue extends AuthInterceptor {
  private requestQueue: Array<() => void> = [];

  public override handleResponseError = async (
    error: AxiosError,
  ): Promise<AxiosResponse> => {
    const originalRequest = error.config as AxiosReqConfigWithRetry;

    if (error.response?.status !== 401 || originalRequest._isRetry) {
      return Promise.reject(error);
    }

    originalRequest._isRetry = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      this.onAuthFail();
      return Promise.reject(error);
    }

    if (!this.refreshPromise) {
      this.refreshPromise = this.refreshTokens(refreshToken)
        .then(res => res)
        .finally(() => {
          this.clearPromise();

          const queue = this.clearQueue();

          for (const retry of queue) retry();
        });
    }

    return new Promise((resolve, reject) => {
      const retryRequest = () => {
        this.axiosInstance(originalRequest).then(resolve).catch(reject);
      };

      this.requestQueue.push(retryRequest);
    });
  };

  private clearQueue() {
    const queue = [...this.requestQueue];
    this.requestQueue = [];

    return queue;
  }
}
