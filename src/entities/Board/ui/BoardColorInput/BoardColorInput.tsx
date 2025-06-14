import { CheckIcon } from 'lucide-react';

import { cn } from '@/shared/lib/css';
import { mapColorToClassName } from '../../config';

import type { MouseEvent } from 'react';
import type { Color } from '../../model/types';

interface Props {
  onSelect?: (e: MouseEvent<HTMLButtonElement>, color: Color) => void;
  currentColor?: Color | Color[] | null;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  label?: string;
}

export function BoardColorInput(props: Props) {
  const { label, currentColor, onSelect, onClick, className } = props;

  const colors = Object.keys(mapColorToClassName) as Color[];

  return (
    <div className={cn('flex flex-col gap-2', className)} onClick={onClick}>
      {label && (
        <span className='text-[10px] font-medium uppercase text-muted-foreground'>
          {label}
        </span>
      )}

      <div className='flex flex-wrap gap-2 max-w-40'>
        {colors.map(color => {
          const isActive = Array.isArray(currentColor)
            ? currentColor.includes(color)
            : currentColor === color;

          return (
            <button
              type='button'
              key={color}
              className={cn(
                'grid place-content-center size-4 rounded-full border-[1.5px] border-primary/30',
                mapColorToClassName[color],
              )}
              onClick={e => onSelect?.(e, color)}
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
