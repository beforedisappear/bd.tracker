import { EllipsisVertical } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function SelectBoardItemMenuTrigger(props: Props) {
  return (
    <Button
      variant={null}
      size='icon'
      className='w-6 h-6 justify-end'
      {...props}
      //to prevent redirect when clicking on SelectBoardItem
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <EllipsisVertical className='w-4 h-4' />
    </Button>
  );
}
