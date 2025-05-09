'use client';

import { Drawer } from '@/shared/ui/c';
import { CreateTeamForm } from '../CreateTeamForm/CreateTeamForm';
import { CreateTeamTrigger } from '../CreateTeamTrigger/CreateTeamTrigger';

import { CREATE_TEAM_TITLE } from '../../constants';

export function CreateTeamMobile() {
  return (
    <Drawer
      title={CREATE_TEAM_TITLE}
      titleClassName='text-center'
      trigger={<CreateTeamTrigger />}
      className='h-[400px]'
    >
      <CreateTeamForm className='p-6' />
    </Drawer>
  );
}
