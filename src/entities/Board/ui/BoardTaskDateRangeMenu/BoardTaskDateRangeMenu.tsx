import { Popover } from '@/shared/ui/c';
import { BoardTaskDateRangeMenuTrigger } from '../BoardTaskDateRangeMenuTrigger/BoardTaskDateRangeMenuTrigger';
import { BoardTaskDateRangeMenuContent } from '../BoardTaskDateRangeMenuContent/BoardTaskDateRangeMenuContent';

import { useCallback, useState } from 'react';

interface Props {
  taskId: string;
  startDate: string | null;
  endDate: string | null;
}

export function BoardTaskDateRangeMenu(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Popover
      trigger={
        <BoardTaskDateRangeMenuTrigger
          startDate={props.startDate}
          endDate={props.endDate}
        />
      }
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-auto p-0'
      content={{ align: 'start' }}
    >
      <BoardTaskDateRangeMenuContent {...props} onClose={onClose} />
    </Popover>
  );
}
