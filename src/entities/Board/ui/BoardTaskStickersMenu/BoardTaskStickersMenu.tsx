import { Popover } from '@/shared/ui/c';
import { BoardTaskStickersMenuTrigger } from '../BoardTaskStickersMenuTrigger/BoardTaskStickersMenuTrigger';
import { BoardTaskStickersMenuContent } from '../BoardTaskStickersMenuContent/BoardTaskStickersMenuContent';

import type { Sticker } from '@/entities/Board';

interface Props {
  taskId: string;
  stickers: Sticker[];
}

export function BoardTaskStickersMenu(props: Props) {
  const { taskId, stickers } = props;

  return (
    <Popover
      trigger={<BoardTaskStickersMenuTrigger stickers={stickers} />}
      className='flex flex-col w-56 min-h-36'
      content={{ align: 'start' }}
    >
      <BoardTaskStickersMenuContent taskId={taskId} stickers={stickers} />
    </Popover>
  );
}
