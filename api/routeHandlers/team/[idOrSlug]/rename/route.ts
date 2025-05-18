import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';

import { authService } from 'api/services/auth.service';
import { teamService } from 'api/services/team.service';

import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import {
  RenameTeamByIdOrSlugReqBodySchema,
  RenameTeamByIdOrSlugReqParamsSchema,
} from './dto';

import type { RenameTeamReqDto, RenameTeamByIdOrSlugReqParams } from './types';

export async function PatchTeamRename(
  request: NextRequest,
  { params }: { params: Promise<RenameTeamByIdOrSlugReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;

    RenameTeamByIdOrSlugReqParamsSchema.parse({ idOrSlug });

    const data: RenameTeamReqDto = await request.json();

    RenameTeamByIdOrSlugReqBodySchema.parse(data);

    const newTeam = await teamService.renameTeam({ idOrSlug, data, userId });

    return NextResponse.json(newTeam, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
