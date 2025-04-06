import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';

import { ErrorResponse } from '$/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromReq, getQueryParams } from '$/utils';

import { CreateTeamDataReqSchema } from '$/dto/team.dto';
import type { CreateTeamReqDto, DeleteTeamReqDto } from '$/types/team.types';

export async function GetTeamByIdOrSlug(request: NextRequest) {
  try {
    const { teamIdOrSlug } = getQueryParams(request, ['teamIdOrSlug'], {
      strict: true,
    });

    const accessToken = getAccessTokenFromReq(request);

    await authService.verifyJwt(accessToken);

    const team = await teamService.getTeamByIdOrSlug(teamIdOrSlug);

    return NextResponse.json(team, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function PostCreateTeam(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const dto: CreateTeamReqDto = await request.json();

    CreateTeamDataReqSchema.parse(dto);

    const newTeam = await teamService.createTeam(userId, dto);

    return NextResponse.json(newTeam, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function DeleteTeam(
  request: NextRequest,
  { params }: { params: Promise<DeleteTeamReqDto> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { id: teamId } = await params;

    const deletedTeam = await teamService.deleteTeamByOwner(teamId, userId);

    return NextResponse.json(
      { id: deletedTeam.id },
      {
        status: 200,
      },
    );
  } catch (e) {
    return ErrorResponse(e);
  }
}
