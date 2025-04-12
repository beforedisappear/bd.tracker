import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';
import { GetTeamMembersReqParams } from '$/types/team.types';
import { getAccessTokenFromReq } from '$/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GetTeamMembers(
  request: NextRequest,
  { params }: { params: Promise<GetTeamMembersReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;

    const members = await teamService.getTeamMembers(idOrSlug, userId);

    return NextResponse.json(members, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
