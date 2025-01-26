import { LoginDataReqSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { NextResponse, type NextRequest, userAgent } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';

import type { ILoginDto } from '$/types';

export async function LoginPost(request: NextRequest) {
  try {
    const data: ILoginDto = await request.json();

    LoginDataReqSchema.parse(data);

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
