import { logoutDataSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { NextResponse, type NextRequest } from 'next/server';

import type { ILogoutDto } from '$/types';
import { handleError } from '$/errors/handeError';

export async function POST(request: NextRequest) {
  try {
    const dto: ILogoutDto = await request.json();

    logoutDataSchema.parse(dto);

    await authService.logout(dto);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return handleError(e);
  }
}
