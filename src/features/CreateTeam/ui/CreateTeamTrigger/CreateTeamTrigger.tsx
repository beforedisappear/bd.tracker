import { Button, ButtonProps } from '@/shared/ui/c';
import { PlusIcon } from 'lucide-react';
interface Props extends ButtonProps {}

export function CreateTeamTrigger(props: Props) {
  return (
    <Button
      type='button'
      variant={null}
      className='w-fit'
      data-testid='create-team-button'
      {...props}
    >
      <PlusIcon className='w-4 h-4' />
      <span>Создать команду</span>
    </Button>
  );
}
