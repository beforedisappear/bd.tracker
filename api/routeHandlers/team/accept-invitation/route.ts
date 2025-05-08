import { teamService } from '$/services/team.service';

import { ErrorResponse } from '$/errors/errorResponse';
import { getQueryParams } from '$/utils';

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
