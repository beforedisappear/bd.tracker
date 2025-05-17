import { teamService } from '$/services/team.service';
import { getAccessTokenFromReq } from '$/utils/getAccessTokenFromReq';
import { authService } from '$/services/auth.service';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';

import { GetHaveAccessToTeamDtoSchema } from './dto';
import type { GetHaveAccessToTeamDto } from './types';

export async function GetHaveAccessToTeam(
  request: NextRequest,
  { params }: { params: Promise<GetHaveAccessToTeamDto> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = GetHaveAccessToTeamDtoSchema.parse(await params);

    const haveAccess = await teamService.haveAccess({
      idOrSlug,
      userId,
    });

    return NextResponse.json(haveAccess, { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
}
