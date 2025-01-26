import { LogoutDataReqSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { NextResponse, type NextRequest } from 'next/server';

import type { ILogoutDto } from '$/types';
import { ErrorResponse } from '$/errors/errorResponse';

export async function LogoutPost(request: NextRequest) {
  try {
    const dto: ILogoutDto = await request.json();

    LogoutDataReqSchema.parse(dto);

    await authService.logout(dto);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
