import { authService } from 'api/services/auth.service';
import { teamService } from 'api/services/team.service';

import { ErrorResponse } from 'api/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromReq } from 'api/utils';

import { CreateTeamReqBodySchema } from './dto';
import type { CreateTeamReqDto } from './types';

export async function PostCreateTeam(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const data: CreateTeamReqDto = await request.json();

    CreateTeamReqBodySchema.parse(data);

    const newTeam = await teamService.createTeam({
      ownerId: userId,
      data,
    });

    return NextResponse.json(newTeam, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function GetTeamList(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const teamList = await teamService.getUserTeamsByUserId({ userId });

    return NextResponse.json(teamList, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
