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

  let message = `Internal Server Error`;

  if (e instanceof Error) {
    message += e.message;
  }

  return new NextResponse(message, { status: 500 });
}
