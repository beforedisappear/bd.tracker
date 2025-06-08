import { CheckIcon } from 'lucide-react';
import { mapColorToClassName, type Color } from '@/entities/Board';
import { cn } from '@/shared/lib/css';
import type { MouseEvent } from 'react';

interface Props {
  currentColor: Color;
  onSelect: (e: MouseEvent<HTMLButtonElement>, color: Color) => void;
}

export function ViewBoardTaskMenuItemColors(props: Props) {
  const { currentColor, onSelect } = props;

  const colors = Object.keys(mapColorToClassName) as Color[];

  return (
    <div
      className='flex flex-col gap-2 px-2 py-1'
      onClick={e => e.stopPropagation()}
    >
      <span className='text-[10px] font-medium uppercase text-muted-foregroun'>
        Цвет задачи
      </span>

      <div className='flex flex-wrap gap-2 max-w-40'>
        {colors.map(color => (
          <button
            key={color}
            className={cn(
              'grid place-content-center size-4 rounded-full border-[1.5px] border-primary/30',
              mapColorToClassName[color],
            )}
            onClick={e => onSelect(e, color)}
          >
            {currentColor === color && (
              <CheckIcon className='size-3 text-primary/50' />
            )}
            <span className='sr-only'>{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
