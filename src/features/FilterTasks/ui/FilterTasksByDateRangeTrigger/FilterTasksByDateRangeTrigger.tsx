import { Calendar } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

import { useProject } from '@/shared/lib/navigation';
import { useBoardStore, type BoardStore } from '@/entities/Board';
import { cn } from '@/shared/lib/css';

interface Props extends ButtonProps {}

export function FilterTasksByDateRangeTrigger(props: Props) {
  const { className, ...rest } = props;

  const { boardId } = useProject();

  const selector = (state: BoardStore) =>
    state.mapDateRangeTaskFilterByBoardId[boardId]?.from &&
    state.mapDateRangeTaskFilterByBoardId[boardId]?.to
      ? true
      : false;

  const dateRangeTaskFilterUsed = useBoardStore(selector);

  return (
    <Button
      variant={null}
      size='sm'
      className={cn(className, { 'text-blue-600': dateRangeTaskFilterUsed })}
      {...rest}
    >
      <Calendar />
      <span>Дата</span>
    </Button>
  );
}
