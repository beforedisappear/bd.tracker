import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';

import { userService } from 'api/services/user.service';
import { authService } from 'api/services/auth.service';

import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';

import { PostSendChangeEmailReqBodySchema } from './dto';

export const PostSendChangeEmail = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const data = PostSendChangeEmailReqBodySchema.parse(body);

    const accessToken = getAccessTokenFromReq(req);

    const { userId } = await authService.verifyJwt(accessToken);

    await userService.sendChangeEmailRequest({
      userId,
      newEmail: data.email,
    });

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return ErrorResponse(e);
  }
};
