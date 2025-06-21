import { BoardTaskStickersMenu, Task } from '@/entities/Board';

interface Props {
  taskId: Task['id'];
  stickers: Task['stickers'];
}

export function TaskOverviewSheetStickers(props: Props) {
  const { taskId, stickers } = props;

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-xs text-muted-foreground'>Метки</div>

      <div className='flex gap-2'>
        <BoardTaskStickersMenu
          taskId={taskId}
          stickers={stickers}
          triggerType='badge'
        />
      </div>
    </div>
  );
}
