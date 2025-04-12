import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';

import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';

import { getAccessTokenFromReq } from '$/utils';
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

    const dto: RenameTeamReqDto = await request.json();

    RenameTeamByIdOrSlugReqBodySchema.parse(dto);

    const newTeam = await teamService.renameTeam(idOrSlug, userId, dto);

    return NextResponse.json(
      { name: newTeam.name },
      {
        status: 200,
      },
    );
  } catch (e) {
    return ErrorResponse(e);
  }
}
