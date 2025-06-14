import { Tag } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';
import { type MouseEvent } from 'react';
import { BoardSticker, type Sticker } from '@/entities/Board';

interface Props extends ButtonProps {
  stickers: Sticker[];
}

export function ViewBoardTaskStickersMenuTrigger(props: Props) {
  const { onClick, stickers, ...rest } = props;

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  const handeBadgeClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e as unknown as MouseEvent<HTMLButtonElement>);
  };

  const noStickers = stickers.length === 0;

  if (noStickers) {
    return (
      <Button
        variant={null}
        size='sm'
        className='p-1 size-6 gap-1 border border-dashed border-primary/60 text-primary/60'
        onClick={handleBtnClick}
        {...rest}
      >
        <Tag className='!size-3.5' />
      </Button>
    );
  }

  return (
    <>
      {stickers.map((el, i) => (
        <BoardSticker
          key={el.id}
          data={el}
          onClick={handeBadgeClick}
          {...(i === 0 ? rest : {})}
        />
      ))}
    </>
  );
}
