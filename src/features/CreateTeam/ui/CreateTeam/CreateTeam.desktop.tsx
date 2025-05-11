'use client';

import { Dialog } from '@/shared/ui/c';
import { CreateTeamForm } from '../CreateTeamForm';
import { CreateTeamTrigger } from '../CreateTeamTrigger/CreateTeamTrigger';

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
