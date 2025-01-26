import { ApiError } from './apiError';
import { NextResponse } from 'next/server';

import { ZodError } from 'zod';

export function ErrorResponse(e: unknown) {
  console.error(e);

  if (e instanceof ApiError) {
    return new NextResponse(e.message, {
      status: e.status,
      statusText: e.statusText,
    });
  }

  if (e instanceof ZodError) {
    return new NextResponse(e.errors[0]?.message || 'Validation error', {
      status: 400,
      statusText: 'Bad Request',
    });
  }

  return new NextResponse('Internal Server Error', { status: 500 });
}
