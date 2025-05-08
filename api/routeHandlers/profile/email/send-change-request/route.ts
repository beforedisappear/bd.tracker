import { NextRequest, NextResponse } from 'next/server';
import { userService } from '$/services/user.service';
import { PostSendChangeEmailReqBodySchema } from './dto';
import { authService } from '$/services/auth.service';
import { getAccessTokenFromReq } from '$/utils/getAccessTokenFromReq';

export const PostSendChangeEmail = async (req: NextRequest) => {
  const body = await req.json();

  const data = PostSendChangeEmailReqBodySchema.parse(body);

  const accessToken = getAccessTokenFromReq(req);

  const { userId } = await authService.verifyJwt(accessToken);

  await userService.sendChangeEmailRequest({
    userId,
    newEmail: data.email,
  });

  return new NextResponse(undefined, {
    status: 204,
  });
};
