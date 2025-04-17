import { RefreshTokensReqSchema } from './dto';
import { authService } from '$/services/auth.service';
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';

import type { RefreshTokensDto } from './types';

export async function PostRefreshTokens(request: NextRequest) {
  try {
    const dto: RefreshTokensDto = await request.json();

    RefreshTokensReqSchema.parse(dto);

    const agent = userAgent(request);

    const newPair = await authService.refreshTokens(dto, agent.ua);

    return NextResponse.json(newPair, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
