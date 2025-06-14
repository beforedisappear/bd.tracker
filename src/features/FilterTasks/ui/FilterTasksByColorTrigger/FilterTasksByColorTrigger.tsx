import { Palette } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';

import { useProject } from '@/shared/lib/navigation';
import { useBoardStore, type BoardStore } from '@/entities/Board';

import { cn } from '@/shared/lib/css';

interface Props extends ButtonProps {}

export function FilterTasksByColorTrigger(props: Props) {
  const { className, ...rest } = props;

  const { boardId } = useProject();

  const selector = (state: BoardStore) =>
    state.mapColorTaskFilterByBoardId[boardId] &&
    state.mapColorTaskFilterByBoardId[boardId].length > 0
      ? true
      : false;

  const colorTaskFilterUsed = useBoardStore(selector);

  return (
    <Button
      variant={null}
      size='sm'
      className={cn(className, { 'text-blue-600': colorTaskFilterUsed })}
      {...rest}
    >
      <Palette />
      <span>Цвет</span>
    </Button>
  );
}
