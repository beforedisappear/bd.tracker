import {
  GetTeamMemberByIdReqParamsSchema,
  RemoveTeamMemberByIdReqParamsSchema,
} from '$/dto/team.dto';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';
import {
  GetTeamMemberByIdReqParams,
  RemoveTeamMemberByIdReqParams,
} from '$/types/team.types';
import { getAccessTokenFromReq } from '$/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GetTeamMemberById(
  request: NextRequest,
  { params }: { params: Promise<GetTeamMemberByIdReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug, memberId } = await params;

    GetTeamMemberByIdReqParamsSchema.parse({ idOrSlug, memberId });

    const member = await teamService.getTeamMemberById(
      idOrSlug,
      memberId,
      userId,
    );

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

    await teamService.removeMemberFromTeam(idOrSlug, memberId, userId);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
