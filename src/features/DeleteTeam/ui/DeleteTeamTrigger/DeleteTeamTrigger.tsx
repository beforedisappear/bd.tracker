import { Button, ButtonProps } from '@/shared/ui/c';
import { Trash2Icon } from 'lucide-react';

interface Props extends ButtonProps {}

export function DeleteTeamTrigger(props: Props) {
  return (
    <Button
      type='button'
      variant='destructive'
      className='w-fit'
      data-testid='delete-team-button'
      {...props}
    >
      <Trash2Icon className='w-4 h-4' />
      <span>Удалить команду</span>
    </Button>
  );
}
