import { Popover } from '@/shared/ui/c';
import { ViewBoardTaskStickersMenuTrigger } from '../ViewBoardTaskStickersMenuTrigger/ViewBoardTaskStickersMenuTrigger';
import { useState } from 'react';

export function ViewBoardTaskStickersMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      trigger={<ViewBoardTaskStickersMenuTrigger />}
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-56'
    >
      123
    </Popover>
  );
}
