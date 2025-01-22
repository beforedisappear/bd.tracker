import { authDataSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { ZodError } from 'zod';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    authDataSchema.parse(data);

    await authService.auth(data);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    let status = 500;
    let message = '';

    if (e instanceof ZodError) {
      status = 400;
      message = e.errors[0].message;
    }

    return new NextResponse(message, { status });
  }
}
