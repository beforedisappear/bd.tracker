import { teamService } from 'api/services/team.service';

import { ErrorResponse } from 'api/errors/errorResponse';
import { getQueryParams } from 'api/utils';

import { type NextRequest, NextResponse } from 'next/server';

import { AcceptInvitationToTeamReqQuerySchema } from './dto';

export async function PostAcceptInvitationToTeam(request: NextRequest) {
  try {
    const query = getQueryParams(request, ['invitationId', 'token']);

    const data = AcceptInvitationToTeamReqQuerySchema.parse(query);

    await teamService.acceptInvitaion(data);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
