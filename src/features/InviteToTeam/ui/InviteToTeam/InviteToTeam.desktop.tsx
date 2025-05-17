import { Dialog } from '@/shared/ui/c';
import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';
import { InviteToTeamContent } from '../InviteToTeamContent/InviteToTeamContent';

import { useCallback, useState } from 'react';

import { INVITE_TO_TEAM_TITLE } from '../../config';

export function InviteToTeamDesktop() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const onClose = useCallback(() => {
    setShowInviteModal(false);
  }, []);

  return (
    <Dialog
      title={INVITE_TO_TEAM_TITLE}
      trigger={<InviteToTeamTrigger />}
      className='h-[430px]'
      open={showInviteModal}
      onOpenChange={setShowInviteModal}
    >
      <InviteToTeamContent onClose={onClose} />
    </Dialog>
  );
}
