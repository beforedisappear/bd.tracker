import { RespondToInvitationReqQuerySchema } from '$/dto/team.dto';
import { teamService } from '$/services/team.service';
import type { RespondToInvitationReqQuery } from '$/types/team.types';
import { redirect } from 'next/navigation';

interface IProps {
  searchParams: Promise<RespondToInvitationReqQuery>;
}

export default async function InvitePage({ searchParams }: IProps) {
  const { invitationId, token } = await searchParams;

  try {
    RespondToInvitationReqQuerySchema.parse({ invitationId, token });

    teamService.acceptInvitaion(invitationId, token);

    return redirect('/login');
  } catch (e) {
    console.error(e);
    return redirect('/');
  }
}
