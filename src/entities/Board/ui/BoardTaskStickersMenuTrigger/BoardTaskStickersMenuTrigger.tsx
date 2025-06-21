import { Tag } from 'lucide-react';
import { BoardSticker } from '../BoardSticker/BoardSticker';
import { Button, type ButtonProps } from '@/shared/ui/c';
import { Badge, type BadgeProps } from '@/shared/ui/s';
import { type MouseEvent } from 'react';
import { type Sticker, type StickerMenuTriggerType } from '../../model/types';

type Props = {
  stickers: Sticker[];
  triggerType?: StickerMenuTriggerType;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
} & (
  | ({ triggerType?: 'button' } & ButtonProps)
  | ({ triggerType: 'badge' } & BadgeProps)
);

export function BoardTaskStickersMenuTrigger(props: Props) {
  const { onClick, stickers, triggerType = 'button', ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e as MouseEvent<HTMLButtonElement | HTMLDivElement>);
  };

  const noStickers = stickers.length === 0;

  if (noStickers && triggerType === 'button') {
    return (
      <Button
        variant={null}
        size='sm'
        className='p-1 size-6 gap-1 border border-dashed border-primary/60 text-primary/60'
        onClick={handleClick}
        {...(rest as ButtonProps)}
      >
        <Tag className='!size-3.5' />
      </Button>
    );
  } else if (noStickers && triggerType === 'badge') {
    return (
      <Badge variant='outline' onClick={handleClick} {...(rest as BadgeProps)}>
        Нет меток
      </Badge>
    );
  }

  return (
    <>
      {stickers.map((el, i) => (
        <BoardSticker
          key={el.id}
          data={el}
          onClick={handleClick}
          {...(i === 0 ? (rest as BadgeProps) : {})}
        />
      ))}
    </>
  );
}
