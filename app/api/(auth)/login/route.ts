import { loginDataSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { NextResponse, type NextRequest, userAgent } from 'next/server';
import { handleError } from '$/errors/handeError';

import type { ILoginDto } from '$/types';

export async function POST(request: NextRequest) {
  try {
    const data: ILoginDto = await request.json();

    loginDataSchema.parse(data);

    const agent = userAgent(request);

    const res = await authService.login(data, agent.ua);

    if (!res)
      return new NextResponse('Incorrect or expired code', { status: 400 });

    return NextResponse.json(res, {
      status: 200,
    });
  } catch (e) {
    return handleError(e);
  }
}
