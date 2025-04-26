import { Dialog } from '@/shared/ui/c';
import { CreateTeamTrigger } from '../CreateTeamTrigger/CreateTeamTrigger';
// import { CreateTeamForm } from '../CreateTeamForm/CreateTeamForm';

interface Props {}

export function CreateTeam({}: Props) {
  return (
    <Dialog title='Создать команду' trigger={<CreateTeamTrigger />}>
      {/* <CreateTeamForm /> */}
    </Dialog>
  );
}
