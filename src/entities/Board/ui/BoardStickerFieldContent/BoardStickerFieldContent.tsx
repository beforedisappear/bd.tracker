import { Checkbox, ScrollArea } from '@/shared/ui/c';
import { BoardSticker } from '../BoardSticker/BoardSticker';
import { BoardStickerFieldContentPlaceholder } from './BoardStickerFieldContent.placeholder';

import type { Sticker } from '../../model/types';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  data: Sticker[];
  onCheckedChange: (value: CheckedState, id: string) => void;
}

export function BoardStickerFieldContent(props: Props) {
  const { data, onCheckedChange } = props;

  return (
    <ScrollArea
      type='always'
      className='h-32 pr-4 mr-[-1rem]'
      viewportClassName='*:h-full'
      onClick={e => e.stopPropagation()}
    >
      <div className='flex flex-col flex-1 gap-2 h-full'>
        {data.map(el => (
          <Checkbox
            key={el.id}
            name={`stickerIds.${el.id}`}
            label={<BoardSticker key={el.id} data={el} />}
            onCheckedChange={value => onCheckedChange(value, el.id)}
            withRightLabel
          />
        ))}

        {data.length === 0 && <BoardStickerFieldContentPlaceholder />}
      </div>
    </ScrollArea>
  );
}
