import { EditTeamNameLabel } from '../EditTeamNameLabel/EditTeamNameLabel';

export function EditTeamNamePlaceholder() {
  return (
    <div className='flex flex-col gap-2'>
      <EditTeamNameLabel label='Ваша команда' />
    </div>
  );
}
