import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { userService } from '$/services/user.service';

import { getAccessTokenFromReq } from '$/utils';

import { type NextRequest, NextResponse } from 'next/server';

export async function GetProfile(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const data = await userService.findOne({ idOrEmail: userId });

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
