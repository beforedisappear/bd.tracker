import { Button, ButtonProps } from '@/shared/ui/c';
import { PlusIcon } from 'lucide-react';

interface Props extends ButtonProps {}

export function CreateBoardTrigger(props: Props) {
  return (
    <Button type='button' variant={null} className='w-fit' {...props}>
      <PlusIcon className='w-4 h-4' />
    </Button>
  );
}
