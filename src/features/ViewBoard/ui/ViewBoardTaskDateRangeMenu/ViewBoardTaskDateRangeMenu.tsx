import { Popover } from '@/shared/ui/c';
import { ViewBoardTaskDateRangeMenuTrigger } from '../ViewBoardTaskDateRangeMenuTrigger/ViewBoardTaskDateRangeMenuTrigger';
import { ViewBoardTaskDateRangeMenuContent } from '../ViewBoardTaskDateRangeMenuContent/ViewBoardTaskDateRangeMenuContent';

import { useCallback, useState } from 'react';

interface Props {
  taskId: string;
  startDate: string | null;
  endDate: string | null;
}

export function ViewBoardTaskDateRangeMenu(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Popover
      trigger={
        <ViewBoardTaskDateRangeMenuTrigger
          startDate={props.startDate}
          endDate={props.endDate}
        />
      }
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-auto p-0'
      content={{ align: 'start' }}
    >
      <ViewBoardTaskDateRangeMenuContent {...props} onClose={onClose} />
    </Popover>
  );
}
