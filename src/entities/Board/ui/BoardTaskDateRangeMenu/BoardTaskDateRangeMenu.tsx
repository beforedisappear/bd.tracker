'use client';

import { Popover } from '@/shared/ui/c';
import { BoardTaskDateRangeMenuTrigger } from '../BoardTaskDateRangeMenuTrigger/BoardTaskDateRangeMenuTrigger';
import { BoardTaskDateRangeMenuContent } from '../BoardTaskDateRangeMenuContent/BoardTaskDateRangeMenuContent';

import { useCallback, useState } from 'react';

import type { DateRangeTriggerType, Task } from '../../model/types';

interface Props {
  taskId: Task['id'];
  startDate: Task['startDate'];
  endDate: Task['endDate'];
  triggerType?: DateRangeTriggerType;
}

export function BoardTaskDateRangeMenu(props: Props) {
  const { startDate, endDate, triggerType = 'button' } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Popover
      trigger={
        <BoardTaskDateRangeMenuTrigger
          startDate={startDate}
          endDate={endDate}
          triggerType={triggerType}
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
