import { Checkbox, Form } from '@/shared/ui/c';

import {
  BoardSticker,
  useBoardStore,
  getMapStickerTaskFilterByBoardId,
} from '@/entities/Board';
import { useProject } from '@/shared/lib/navigation';
import { useForm } from 'react-hook-form';

import { cn } from '@/shared/lib/css';

import type { Sticker } from '@/entities/Board';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  data: Sticker[];
}

export function FilterTasksByStickerForm(props: Props) {
  const { data } = props;

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
      <form
        onSubmit={e => e.preventDefault()}
        className={cn('flex flex-col gap-2')}
      >
        {data.map(el => (
          <Checkbox
            key={el.id}
            name={`stickerIds.${el.id}`}
            label={<BoardSticker key={el.id} data={el} />}
            onCheckedChange={value => onCheckedChange(value, el.id)}
            withRightLabel
          />
        ))}
      </form>
    </Form>
  );
}
