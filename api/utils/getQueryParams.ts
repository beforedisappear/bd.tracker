import { ApiError } from 'api/errors/apiError';
import { NextRequest } from 'next/server';

type GetQueryParamsOptions = {
  strict?: boolean;
};

type QueryParamConfig = {
  type: 'string' | 'array';
  separator?: string;
};

export const getQueryParams = <
  T extends Record<string, QueryParamConfig | undefined>,
>(
  request: NextRequest,
  keys: string[],
  options?: GetQueryParamsOptions,
  config?: T,
): { [K in keyof T]: T[K] extends { type: 'array' } ? string[] : string } => {
  const searchParams = request.nextUrl.searchParams;

  return keys.reduce((acc, key) => {
    const value = searchParams.get(key);

    if (options?.strict && value === null) {
      throw ApiError.badRequest(`Missing required query parameter: ${key}`);
    }

    if (value === null) {
      acc[key] = undefined;
      return acc;
    }

    const paramConfig = config?.[key];

    if (paramConfig?.type === 'array') {
      try {
        acc[key] = JSON.parse(value);
      } catch {
        acc[key] = [value];
      }
    } else {
      acc[key] = value;
    }

    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any);
};
