import { redirect } from 'next/navigation';

import { teamService } from '$/services/team.service';

import type { AcceptInvitationToTeamReqQuery } from '$/types/team.types';
import { AcceptInvitationToTeamReqQuerySchema } from '$/dto/team.dto';

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
