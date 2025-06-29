import { type ButtonProps, Dialog } from '@/shared/ui/c';
import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';
import { InviteToTeamContent } from '../InviteToTeamContent';

import { useCallback, useState } from 'react';

import { INVITE_TO_TEAM_TITLE } from '../../constants';

interface Props {
  btnText: string;
  triggerBtnVariant?: ButtonProps['variant'];
}

export function InviteToTeamDesktop(props: Props) {
  const { btnText, triggerBtnVariant } = props;

  const [showInviteModal, setShowInviteModal] = useState(false);

  const onClose = useCallback(() => {
    setShowInviteModal(false);
  }, []);

  return (
    <Dialog
      title={INVITE_TO_TEAM_TITLE}
      trigger={
        <InviteToTeamTrigger text={btnText} variant={triggerBtnVariant} />
      }
      className='h-[450px]'
      open={showInviteModal}
      onOpenChange={setShowInviteModal}
    >
      <InviteToTeamContent onClose={onClose} />
    </Dialog>
  );
}
