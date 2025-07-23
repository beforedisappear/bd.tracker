'use client';

import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios';
import { REQUEST_TIMEOUT } from '../constants';

class ApiClient {
  public noAuth: AxiosInstance;
  public withAuth: AxiosInstance;

  constructor(baseURL?: string) {
    const options = {
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL || '',
      timeout: REQUEST_TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    };

    this.noAuth = axios.create({ ...options });

    this.withAuth = axios.create({ ...options });
  }

  public registerReqInterceptor(
    type: 'withAuth' | 'noAuth',
    interceptor: (
      config: InternalAxiosRequestConfig,
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    errorHandler?: (error: unknown) => unknown,
  ) {
    return this[type].interceptors.request.use(interceptor, errorHandler);
  }

  public registerResInterceptor(
    type: 'withAuth' | 'noAuth',
    onSuccess: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onError?: (error: unknown) => unknown,
  ) {
    return this[type].interceptors.response.use(onSuccess, onError);
  }
}

export default ApiClient;
