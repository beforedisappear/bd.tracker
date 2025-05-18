import { ErrorResponse } from 'api/errors/errorResponse';
import { NextRequest, NextResponse } from 'next/server';

import { authService } from 'api/services/auth.service';
import { teamService } from 'api/services/team.service';

import {
  GetTeamMemberByIdReqParamsSchema,
  RemoveTeamMemberByIdReqParamsSchema,
} from './dto';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';

import type {
  GetTeamMemberByIdReqParams,
  RemoveTeamMemberByIdReqParams,
} from './types';

export async function GetTeamMemberById(
  request: NextRequest,
  { params }: { params: Promise<GetTeamMemberByIdReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug, memberId } = await params;

    GetTeamMemberByIdReqParamsSchema.parse({ idOrSlug, memberId });

    const member = await teamService.getTeamMemberById({
      idOrSlug,
      memberId,
      initiatorId: userId,
    });

    return NextResponse.json(member, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function DeleteRemoveTeamMemberById(
  request: NextRequest,
  { params }: { params: Promise<RemoveTeamMemberByIdReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug, memberId } = await params;

    RemoveTeamMemberByIdReqParamsSchema.parse({ idOrSlug, memberId });

    await teamService.removeMemberFromTeam({
      idOrSlug,
      memberId,
      initiatorId: userId,
    });

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
