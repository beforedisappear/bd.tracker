import { ApiError } from 'api/errors/apiError';
import { NextRequest } from 'next/server';

export function getAccessTokenFromReq(request: NextRequest) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) throw ApiError.forbidden('Token was not provided');

  return accessToken;
}
