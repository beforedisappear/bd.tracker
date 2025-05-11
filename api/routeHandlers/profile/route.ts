import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { userService } from '$/services/user.service';

import { getAccessTokenFromReq } from '$/utils';

import { UserSchemaReq } from './dto';
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

export async function UpdateProfile(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const body = await request.json();

    const { name } = UserSchemaReq.parse(body);

    const data = await userService.update({
      id: userId,
      newName: name,
    });

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
