import { teamService } from 'api/services/team.service';

import { ErrorResponse } from 'api/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';

import { AcceptInvitationToTeamReqBodySchema } from './dto';

export async function PostAcceptInvitationToTeam(request: NextRequest) {
  try {
    const data = AcceptInvitationToTeamReqBodySchema.parse(
      await request.json(),
    );

    await teamService.acceptInvitaion(data);

    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
