import { AuthDataReqSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { ErrorResponse } from '$/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import type { AuthDto } from '$/types';

export async function PostAuth(request: NextRequest) {
  try {
    const data: AuthDto = await request.json();

    AuthDataReqSchema.parse(data);

    await authService.auth(data);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
