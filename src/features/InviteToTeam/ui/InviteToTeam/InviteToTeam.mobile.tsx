import { Drawer } from '@/shared/ui/c';
import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';
import { InviteToTeamContent } from '../InviteToTeamContent/InviteToTeamContent';

import { INVITE_TO_TEAM_TITLE } from '../../config';

export function InviteToTeamMobile() {
  return (
    <Drawer
      title={INVITE_TO_TEAM_TITLE}
      titleClassName='text-center'
      trigger={<InviteToTeamTrigger />}
      className='h-[100vh]'
    >
      <InviteToTeamContent className='p-6' submitButtonClassName='w-full' />
    </Drawer>
  );
}
