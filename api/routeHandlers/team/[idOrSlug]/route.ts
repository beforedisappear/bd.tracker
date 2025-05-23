import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { teamService } from 'api/services/team.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { NextRequest, NextResponse } from 'next/server';

import {
  GetTeamByIdOrSlugReqParamsSchema,
  DeleteTeamByIdOrSlugReqParamsSchema,
} from './dto';
import type { GetTeamByIdOrSlugReqParams, DeleteTeamReqParams } from './types';

export async function GetTeamByIdOrSlug(
  request: NextRequest,
  { params }: { params: Promise<GetTeamByIdOrSlugReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;

    GetTeamByIdOrSlugReqParamsSchema.parse({ idOrSlug });

    const team = await teamService.getTeamByIdOrSlug({ idOrSlug });

    return NextResponse.json(team, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function DeleteTeamByIdOrSlug(
  request: NextRequest,
  { params }: { params: Promise<DeleteTeamReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;

    DeleteTeamByIdOrSlugReqParamsSchema.parse({ idOrSlug });

    const deletedTeam = await teamService.deleteTeam({
      idOrSlug,
      ownerId: userId,
    });

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
