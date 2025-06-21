import { BoardColorInput, type Color } from '@/entities/Board';
import type { MouseEvent } from 'react';

interface Props {
  currentColor: Color;
  onSelect: (e: MouseEvent<HTMLButtonElement>, color: Color) => void;
}

export function BoardTaskHeaderMenuItemColors(props: Props) {
  const { currentColor, onSelect } = props;

  return (
    <BoardColorInput
      currentColor={currentColor}
      onSelect={onSelect}
      onClick={e => e.stopPropagation()}
      className='px-2 py-1'
      label='Цвет задачи'
    />
  );
}
