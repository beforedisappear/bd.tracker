import { taskQueries } from '@/entities/Board';
import { useMutation } from '@tanstack/react-query';
import { Button, Calendar } from '@/shared/ui/c';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useProject } from '@/shared/lib/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';

interface Props {
  taskId: string;
  startDate: string | null;
  endDate: string | null;
  onClose?: () => void;
}

export function ViewBoardTaskDateRangeMenuContent(props: Props) {
  const { taskId, startDate, endDate, onClose } = props;

  const { boardId } = useProject();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    startDate && endDate
      ? { from: new Date(startDate), to: new Date(endDate) }
      : undefined,
  );

  const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    if (!range?.from || !range?.to) return;

    const dto = {
      taskId,
      boardId,
      startDate: range.from.toISOString(),
      endDate: range.to.toISOString(),
    };

    updateTask(dto).catch(e => toast.error(getErrorMessage(e)));
  };

  const onResetFilter = () => {
    onClose?.();
    setDateRange(undefined);
    updateTask({ taskId, boardId, startDate: null, endDate: null }).catch(e =>
      toast.error(getErrorMessage(e)),
    );
  };

  return (
    //TODO: create input and reduce Calendar input
    <div className='flex flex-col p-2' onClick={e => e.stopPropagation()}>
      <Calendar
        mode='range'
        selected={dateRange}
        onSelect={handleSelect}
        initialFocus
      />

      <Button
        variant='secondary'
        size='sm'
        className='w-11/12 mx-auto'
        onClick={onResetFilter}
      >
        Сбросить фильтр
      </Button>
    </div>
  );
}
