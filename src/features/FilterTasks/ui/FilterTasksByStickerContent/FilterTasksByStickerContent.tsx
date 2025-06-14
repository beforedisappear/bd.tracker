import { Form } from '@/shared/ui/c';

import {
  useBoardStore,
  getMapStickerTaskFilterByBoardId,
  BoardStickerInput,
} from '@/entities/Board';
import { useProject } from '@/shared/lib/navigation';
import { useForm } from 'react-hook-form';

import { cn } from '@/shared/lib/css';

import type { CheckedState } from '@radix-ui/react-checkbox';

export function FilterTasksByStickerContent() {
  const { boardId } = useProject();
  const { setMapStickerTaskFilterByBoardId, mapStickerTaskFilterByBoardId } =
    useBoardStore(getMapStickerTaskFilterByBoardId());

  const selectedStickers = mapStickerTaskFilterByBoardId[boardId] ?? [];

  const form = useForm({
    defaultValues: {
      stickerIds: Object.fromEntries(selectedStickers.map(el => [el, true])),
    },
  });

  const onCheckedChange = (checked: CheckedState, stickerId: string) => {
    const newStickers = [...selectedStickers];

    if (checked) {
      newStickers.push(stickerId);
    } else {
      const memberIndex = newStickers.indexOf(stickerId);

      if (memberIndex === -1) return;

      newStickers.splice(memberIndex, 1);
    }

    setMapStickerTaskFilterByBoardId(boardId, newStickers);
  };

  return (
    <Form {...form}>
      <div className='flex flex-col h-full flex-1 gap-2'>
        <span className='text-[10px] font-medium uppercase text-muted-foreground'>
          Метки задачи
        </span>

        <form
          onSubmit={e => e.preventDefault()}
          className={cn('flex flex-col h-full flex-1 gap-2')}
        >
          <BoardStickerInput
            boardId={boardId}
            onCheckedChange={onCheckedChange}
          />
        </form>
      </div>
    </Form>
  );
}
