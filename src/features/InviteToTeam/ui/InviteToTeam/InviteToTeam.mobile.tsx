import { type ButtonProps, Drawer } from '@/shared/ui/c';
import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';
import { InviteToTeamContent } from '../InviteToTeamContent/InviteToTeamContent';

import { INVITE_TO_TEAM_TITLE } from '../../constants';

interface Props {
  btnText: string;
  triggerBtnVariant?: ButtonProps['variant'];
}

export function InviteToTeamMobile(props: Props) {
  const { btnText, triggerBtnVariant } = props;

  return (
    <Drawer
      title={INVITE_TO_TEAM_TITLE}
      titleClassName='text-center'
      trigger={
        <InviteToTeamTrigger text={btnText} variant={triggerBtnVariant} />
      }
      className='h-[100vh]'
    >
      <InviteToTeamContent />
    </Drawer>
  );
}
