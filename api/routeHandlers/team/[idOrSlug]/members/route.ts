import { ErrorResponse } from 'api/errors/errorResponse';
import { NextRequest, NextResponse } from 'next/server';

import { authService } from 'api/services/auth.service';
import { teamService } from 'api/services/team.service';

import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { getQueryParams } from 'api/utils/getQueryParams';

import {
  GetTeamMembersReqParamsSchema,
  GetTeamMembersReqQuerySchema,
} from './dto';
import type { GetTeamMembersReqParams, GetTeamMembersReqQuery } from './types';

export async function GetTeamMembers(
  request: NextRequest,
  { params }: { params: Promise<GetTeamMembersReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;
    GetTeamMembersReqParamsSchema.parse({ idOrSlug });

    const query = getQueryParams(request, [
      'keyword',
    ]) as GetTeamMembersReqQuery;

    GetTeamMembersReqQuerySchema.parse(query);

    const members = await teamService.getTeamMembers({
      idOrSlug,
      userId,
      keyword: query.keyword,
    });

    return NextResponse.json(members, { status: 200 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
