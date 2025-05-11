'use client';

import { Drawer } from '@/shared/ui/c';
import { DeleteTeamForm } from '../DeleteTeamForm';
import { DeleteTeamTrigger } from '../DeleteTeamTrigger/DeleteTeamTrigger';
import { DELETE_TEAM_TITLE } from '../../constants';

interface Props {
  hideTrigger?: boolean;
}

export function DeleteTeamMobile(props: Props) {
  const { hideTrigger } = props;

  return (
    <Drawer
      title={DELETE_TEAM_TITLE}
      titleClassName='text-center'
      trigger={hideTrigger ? null : <DeleteTeamTrigger />}
      className='h-[300px]'
    >
      <DeleteTeamForm />
    </Drawer>
  );
}
