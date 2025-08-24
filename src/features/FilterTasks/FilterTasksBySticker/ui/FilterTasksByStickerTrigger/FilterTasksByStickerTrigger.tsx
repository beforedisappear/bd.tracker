import { Tag } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

import { useProject } from '@/shared/lib/navigation';
import { useBoardStore, BoardStore } from '@/entities/Board';

import { cn } from '@/shared/lib/css';

interface Props extends ButtonProps {}

export function FilterTasksByStickerTrigger(props: Props) {
  const { className, ...rest } = props;

  const { boardId } = useProject();

  const selector = (state: BoardStore) =>
    state.mapStickerTaskFilterByBoardId[boardId] &&
    state.mapStickerTaskFilterByBoardId[boardId].length > 0
      ? true
      : false;

  const stickerFilterUsed = useBoardStore(selector);

  return (
    <Button
      variant={null}
      size='sm'
      className={cn(className, { 'text-blue-600': stickerFilterUsed })}
      {...rest}
    >
      <Tag />
      <span>Метка</span>
    </Button>
  );
}
