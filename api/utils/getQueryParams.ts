import { ApiError } from '$/errors/apiError';
import { NextRequest } from 'next/server';

type GetQueryParamsOptions = {
  strict?: boolean;
};

export const getQueryParams = (
  request: NextRequest,
  keys: string[],
  options?: GetQueryParamsOptions,
): Record<string, string> => {
  const searchParams = request.nextUrl.searchParams;

  return keys.reduce(
    (acc, key) => {
      const value = searchParams.get(key);

      if (options?.strict && value === null) {
        throw ApiError.badRequest(`Missing required query parameter: ${key}`);
      }

      acc[key] = value ?? '';
      return acc;
    },
    {} as Record<string, string>,
  );
};
