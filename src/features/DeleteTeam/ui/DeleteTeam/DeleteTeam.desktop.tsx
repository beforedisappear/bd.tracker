'use client';

import { Dialog } from '@/shared/ui/c';
import { DeleteTeamForm } from '../DeleteTeamForm';
import { DeleteTeamTrigger } from '../DeleteTeamTrigger/DeleteTeamTrigger';

import { DELETE_TEAM_TITLE } from '../../constants';

interface Props {
  hideTrigger?: boolean;
}

export function DeleteTeamDesktop(props: Props) {
  const { hideTrigger } = props;

  return (
    <Dialog
      title={DELETE_TEAM_TITLE}
      titleClassName='text-center'
      trigger={hideTrigger ? null : <DeleteTeamTrigger />}
      className='h-48 max-w-96'
      data-testid='delete-team-dialog'
    >
      <DeleteTeamForm />
    </Dialog>
  );
}
