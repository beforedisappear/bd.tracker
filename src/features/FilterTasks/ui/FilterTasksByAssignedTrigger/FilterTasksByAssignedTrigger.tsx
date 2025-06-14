import { User } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

import { useBoardStore, type BoardStore } from '@/entities/Board';
import { useProject } from '@/shared/lib/navigation';

import { cn } from '@/shared/lib/css';

interface Props extends ButtonProps {}

export function FilterTasksByAssignedTrigger(props: Props) {
  const { className, ...rest } = props;

  const { boardId } = useProject();

  const selector = (state: BoardStore) =>
    state.mapAssigneesTaskFilterByBoardId[boardId] &&
    state.mapAssigneesTaskFilterByBoardId[boardId].length > 0
      ? true
      : false;

  const assignedTaskFilterUsed = useBoardStore(selector);

  return (
    <Button
      variant={null}
      size='sm'
      className={cn(className, { 'text-blue-600': assignedTaskFilterUsed })}
      {...rest}
    >
      <User />
      <span>Ответственный</span>
    </Button>
  );
}
