import { LogoutDataReqSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { NextResponse, type NextRequest } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';

import type { LogoutDto } from '$/types';

export async function PostLogout(request: NextRequest) {
  try {
    const dto: LogoutDto = await request.json();

    LogoutDataReqSchema.parse(dto);

    await authService.logout(dto);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
