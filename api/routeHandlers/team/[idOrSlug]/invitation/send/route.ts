import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';

import { ErrorResponse } from '$/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromReq } from '$/utils';

import { InviteUserToTeamReqBodySchema } from './dto';
import type {
  InviteUserToTeamReqDto,
  InviteUserToTeamReqParams,
} from './types';

export async function PostInviteUserToTeam(
  request: NextRequest,
  { params }: { params: Promise<InviteUserToTeamReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;

    const dto: InviteUserToTeamReqDto = await request.json();

    InviteUserToTeamReqBodySchema.parse(dto);

    const invitationRes = await teamService.sendInvitation({
      idOrSlug,
      inviteeEmail: dto.inviteeEmail,
      inviterId: userId,
      projectIds: dto.projectIds,
    });

    return NextResponse.json(invitationRes, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
