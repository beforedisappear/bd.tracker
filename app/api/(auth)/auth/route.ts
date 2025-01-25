import { AuthDataReqSchema } from '$/dto/auth.dto';
import { authService } from '$/services/auth.service';

import { ErrorResponse } from '$/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    AuthDataReqSchema.parse(data);

    await authService.auth(data);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
