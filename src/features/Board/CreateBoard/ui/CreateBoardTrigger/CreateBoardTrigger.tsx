import { PlusIcon } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';
import { CREATE_BOARD_BTN_WIDTH } from '../../constants';

interface Props extends ButtonProps {}

export function CreateBoardTrigger(props: Props) {
  return (
    <Button
      type='button'
      size='icon'
      variant={null}
      className='flex-shrink-0'
      style={{ width: CREATE_BOARD_BTN_WIDTH }}
      {...props}
    >
      <PlusIcon className='w-4 h-4' />
    </Button>
  );
}
