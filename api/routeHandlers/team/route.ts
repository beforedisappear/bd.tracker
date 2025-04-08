import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';

import { ErrorResponse } from '$/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromReq } from '$/utils';

import { CreateTeamReqBodySchema } from '$/dto/team.dto';
import type { CreateTeamReqDto } from '$/types/team.types';

export async function PostCreateTeam(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const dto: CreateTeamReqDto = await request.json();

    CreateTeamReqBodySchema.parse(dto);

    const newTeam = await teamService.createTeam(userId, dto);

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

    const teamList = await teamService.getUserTeamsByUserId(userId);

    return NextResponse.json(teamList, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
