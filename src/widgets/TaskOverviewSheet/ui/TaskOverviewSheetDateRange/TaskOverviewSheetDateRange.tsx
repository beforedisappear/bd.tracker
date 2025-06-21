import { BoardTaskDateRangeMenu, Task } from '@/entities/Board';

interface Props {
  taskId: Task['id'];
  startDate: Task['startDate'];
  endDate: Task['endDate'];
}

export function TaskOverviewSheetDateRange(props: Props) {
  const { taskId, startDate, endDate } = props;

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-xs text-muted-foreground'>Срок исполнения</div>

      <BoardTaskDateRangeMenu
        taskId={taskId}
        startDate={startDate}
        endDate={endDate}
        triggerType='badge'
      />
    </div>
  );
}
