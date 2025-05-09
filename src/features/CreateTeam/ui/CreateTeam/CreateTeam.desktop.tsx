'use client';

import { Dialog } from '@/shared/ui/c';
import { CreateTeamTrigger } from '../CreateTeamTrigger/CreateTeamTrigger';
import { CreateTeamForm } from '../CreateTeamForm/CreateTeamForm';

interface Props {}

export function CreateTeamDesktop({}: Props) {
  return (
    <Dialog
      title='Создать команду'
      titleClassName='text-center'
      trigger={<CreateTeamTrigger />}
      className='h-80 max-w-96'
      data-testid='create-team-dialog'
    >
      <CreateTeamForm />
    </Dialog>
  );
}
