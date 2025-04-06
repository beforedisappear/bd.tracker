import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';

import { ErrorResponse } from '$/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromReq } from '$/utils';

export async function GetTeamList(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const teamList = await teamService.getUserTeamsByUserId(userId);

    return NextResponse.json(teamList, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
