import { Popover } from '@/shared/ui/c';
import { ViewBoardTaskStickersMenuTrigger } from '../ViewBoardTaskStickersMenuTrigger/ViewBoardTaskStickersMenuTrigger';
import { ViewBoardTaskStickersMenuContent } from '../ViewBoardTaskStickersMenuContent/ViewBoardTaskStickersMenuContent';

import type { Sticker } from '@/entities/Board';

interface Props {
  taskId: string;
  stickers: Sticker[];
}

export function ViewBoardTaskStickersMenu(props: Props) {
  const { taskId, stickers } = props;

  return (
    <Popover
      trigger={<ViewBoardTaskStickersMenuTrigger stickers={stickers} />}
      className='flex flex-col w-56 min-h-36'
      content={{ align: 'start' }}
    >
      <ViewBoardTaskStickersMenuContent taskId={taskId} stickers={stickers} />
    </Popover>
  );
}
