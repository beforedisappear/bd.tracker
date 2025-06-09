import { CheckIcon } from 'lucide-react';

import { cn } from '@/shared/lib/css';
import { mapColorToClassName } from '../../config';

import type { MouseEvent } from 'react';
import type { Color } from '../../model/types';

interface Props {
  onSelect: (e: MouseEvent<HTMLButtonElement>, color: Color) => void;
  currentColor?: Color | Color[];
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function BoardTaskColorsInput(props: Props) {
  const { currentColor, onSelect, onClick, className } = props;

  const colors = Object.keys(mapColorToClassName) as Color[];

  return (
    <div className={cn('flex flex-col gap-2', className)} onClick={onClick}>
      <span className='text-[10px] font-medium uppercase text-muted-foreground'>
        Цвет задачи
      </span>

      <div className='flex flex-wrap gap-2 max-w-40'>
        {colors.map(color => {
          const isActive = Array.isArray(currentColor)
            ? currentColor.includes(color)
            : currentColor === color;

          return (
            <button
              key={color}
              className={cn(
                'grid place-content-center size-4 rounded-full border-[1.5px] border-primary/30',
                mapColorToClassName[color],
              )}
              onClick={e => onSelect(e, color)}
            >
              {isActive && <CheckIcon className='size-3 text-primary/50' />}
              <span className='sr-only'>{color}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
