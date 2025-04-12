import {
  RemoveTeamAdminReqParamsSchema,
  SetTeamAdminReqParamsSchema,
} from '$/dto/team.dto';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';
import type {
  RemoveTeamAdminReqParams,
  SetTeamAdminReqParams,
} from '$/types/team.types';
import { getAccessTokenFromReq } from '$/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function PatchSetTeamAdmin(
  request: NextRequest,
  { params }: { params: Promise<SetTeamAdminReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug, memberId } = await params;

    SetTeamAdminReqParamsSchema.parse({ idOrSlug, memberId });

    await teamService.setAdmin(idOrSlug, memberId, userId);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function DeleteRemoveTeamAdmin(
  request: NextRequest,
  { params }: { params: Promise<RemoveTeamAdminReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug, memberId } = await params;

    RemoveTeamAdminReqParamsSchema.parse({ idOrSlug, memberId });

    await teamService.removeAdmin(idOrSlug, memberId, userId);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
