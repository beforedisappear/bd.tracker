import { LoginReqBodySchema } from './dto';
import { authService } from '$/services/auth.service';

import { NextResponse, type NextRequest, userAgent } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';

import type { LoginDto } from './types';

export async function PostLogin(request: NextRequest) {
  try {
    const data: LoginDto = await request.json();

    LoginReqBodySchema.parse(data);

    const agent = userAgent(request);

    const res = await authService.login(data, agent.ua);

    if (!res)
      return new NextResponse('Incorrect or expired code', { status: 400 });

    return NextResponse.json(res, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
