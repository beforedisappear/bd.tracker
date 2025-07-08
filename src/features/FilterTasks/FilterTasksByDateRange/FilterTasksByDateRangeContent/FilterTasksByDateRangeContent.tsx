import { Button, Calendar } from '@/shared/ui/c';

import { useState } from 'react';
import { useProject } from '@/shared/lib/navigation';
import {
  useBoardStore,
  getMapDateRangeTaskFilterByBoardId,
} from '@/entities/Board';

import type { DateRange } from 'react-day-picker';

export function FilterTasksByDateRangeContent() {
  const { boardId } = useProject();
  const {
    setMapDateRangeTaskFilterByBoardId,
    mapDateRangeTaskFilterByBoardId,
  } = useBoardStore(getMapDateRangeTaskFilterByBoardId());

  const dateRange = mapDateRangeTaskFilterByBoardId[boardId];

  const [selected, setSelected] = useState<DateRange | undefined>({
    from: dateRange?.from ? new Date(dateRange.from) : undefined,
    to: dateRange?.to ? new Date(dateRange.to) : undefined,
  });

  const handleSelect = (newSelected: DateRange | undefined) => {
    setSelected(newSelected);

    if (!newSelected?.from || !newSelected?.to) return;

    const dateRange = {
      from: newSelected.from.toISOString(),
      to: newSelected.to.toISOString(),
    };

    setMapDateRangeTaskFilterByBoardId(boardId, dateRange);
  };

  const onResetFilter = () => {
    setMapDateRangeTaskFilterByBoardId(boardId, {
      from: undefined,
      to: undefined,
    });
    setSelected(undefined);
  };

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-[10px] font-medium uppercase text-muted-foreground text-center'>
        Дедлайн (интервал дат)
      </span>

      <Calendar
        mode='range'
        numberOfMonths={1}
        selected={selected}
        className='p-0'
        onSelect={handleSelect}
      />

      <Button variant='secondary' size='sm' onClick={onResetFilter}>
        Сбросить фильтр
      </Button>
    </div>
  );
}
