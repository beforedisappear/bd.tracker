import { refreshTokensSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { handleError } from '$/errors/handeError';

import type { IRefreshTokenDto } from '$/types';

export async function POST(request: NextRequest) {
  try {
    const dto: IRefreshTokenDto = await request.json();

    refreshTokensSchema.parse(dto);

    const agent = userAgent(request);

    const newPair = await authService.refreshTokens(dto, agent.ua);

    return NextResponse.json(newPair, {
      status: 200,
    });
  } catch (e) {
    return handleError(e);
  }
}
