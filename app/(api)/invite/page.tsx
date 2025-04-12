import { redirect } from 'next/navigation';

import { teamService } from '$/services/team.service';
import { AcceptInvitationToTeamReqQuerySchema } from '$/routeHandlers/team/accept-invitation/dto';
import type { AcceptInvitationToTeamReqQuery } from '$/routeHandlers/team/accept-invitation/types';

interface IProps {
  searchParams: Promise<AcceptInvitationToTeamReqQuery>;
}

export default async function InvitePage({ searchParams }: IProps) {
  const { invitationId, token } = await searchParams;

  let redirectPath = '/login';

  try {
    AcceptInvitationToTeamReqQuerySchema.parse({ invitationId, token });
    await teamService.acceptInvitaion(invitationId, token);
  } catch (e) {
    console.error(e);
    redirectPath = '/';
  }

  return redirect(redirectPath);
}
