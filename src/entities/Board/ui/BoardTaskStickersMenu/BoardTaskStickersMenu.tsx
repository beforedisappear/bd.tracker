import { Popover } from '@/shared/ui/c';
import { BoardTaskStickersMenuTrigger } from '../BoardTaskStickersMenuTrigger/BoardTaskStickersMenuTrigger';
import { BoardTaskStickersMenuContent } from '../BoardTaskStickersMenuContent/BoardTaskStickersMenuContent';

import type { StickerMenuTriggerType, Task } from '../../model/types';

interface Props {
  taskId: Task['id'];
  stickers: Task['stickers'];
  triggerType?: StickerMenuTriggerType;
}

export function BoardTaskStickersMenu(props: Props) {
  const { taskId, stickers, triggerType } = props;

  return (
    <Popover
      trigger={
        <BoardTaskStickersMenuTrigger
          stickers={stickers}
          triggerType={triggerType}
        />
      }
      className='flex flex-col w-56 min-h-36 px-5'
      content={{ align: 'start' }}
    >
      <BoardTaskStickersMenuContent taskId={taskId} stickers={stickers} />
    </Popover>
  );
}
