import { DeleteMemberFromTeamReqBodySchema } from '$/dto/team.dto';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';
import {
  DeleteMemberFromTeamReqBodyDto,
  DeleteMemberFromTeamReqParams,
  GetTeamMembersReqParams,
} from '$/types/team.types';
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

export async function DeleteMemberFromTeam(
  request: NextRequest,
  { params }: { params: Promise<DeleteMemberFromTeamReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;

    const dto: DeleteMemberFromTeamReqBodyDto = await request.json();

    DeleteMemberFromTeamReqBodySchema.parse(dto);

    await teamService.removeMemberFromTeam(idOrSlug, dto.memberId, userId);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
