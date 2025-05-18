import { LogoutReqBodySchema } from './dto';
import { authService } from 'api/services/auth.service';

import { NextResponse, type NextRequest } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';

import type { LogoutDto } from './types';

export async function PostLogout(request: NextRequest) {
  try {
    const dto: LogoutDto = await request.json();

    LogoutReqBodySchema.parse(dto);

    await authService.logout(dto);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
