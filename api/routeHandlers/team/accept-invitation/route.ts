import { teamService } from '$/services/team.service';

import { ErrorResponse } from '$/errors/errorResponse';
import { getQueryParams } from '$/utils';

import { type NextRequest, NextResponse } from 'next/server';

import { AcceptInvitationToTeamReqQuerySchema } from './dto';

import type { AcceptInvitationToTeamReqQuery } from './types';

export async function PostAcceptInvitationToTeam(request: NextRequest) {
  try {
    const query = getQueryParams(request, [
      'invitationId',
      'token',
    ]) as AcceptInvitationToTeamReqQuery;

    AcceptInvitationToTeamReqQuerySchema.parse(query);

    await teamService.acceptInvitaion(query.invitationId, query.token);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
