import { Trash } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function DeleteTeamMemberTrigger(props: Props) {
  return (
    <Button
      {...props}
      variant={null}
      className='text-sm w-fit font-normal p-0 h-5 text-blue-500'
    >
      <Trash className='h-4 w-4 mr-1' />
      <span>Удалить пользователя</span>
    </Button>
  );
}
