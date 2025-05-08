import { NextRequest, NextResponse } from 'next/server';
import { PostAcceptChangeEmailReqBodySchema } from './dto';
import { userService } from '$/services/user.service';
import { ErrorResponse } from '$/errors/errorResponse';

export async function PostAcceptChangeEmail(req: NextRequest) {
  try {
    const body = await req.json();

    const data = PostAcceptChangeEmailReqBodySchema.parse(body);

    await userService.acceptChangeEmailRequest(data);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
