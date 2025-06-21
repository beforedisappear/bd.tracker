import { Calendar } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';
import { Badge, type BadgeProps } from '@/shared/ui/s';

import { format } from 'date-fns';
import { cn } from '@/shared/lib/css';

import type { MouseEvent } from 'react';
import type { DateRangeTriggerType } from '../../model/types';

type Props = {
  startDate: string | null;
  endDate: string | null;
  triggerType?: DateRangeTriggerType;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
} & (
  | ({ triggerType?: 'button' } & ButtonProps)
  | ({ triggerType: 'badge' } & BadgeProps)
);

export function BoardTaskDateRangeMenuTrigger(props: Props) {
  const {
    onClick,
    startDate,
    endDate,
    triggerType = 'button',
    className,
    ...rest
  } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e as MouseEvent<HTMLButtonElement | HTMLDivElement>);
  };

  const formattedDate =
    startDate && endDate
      ? `${format(new Date(startDate), 'dd.MM.yy')} - ${format(new Date(endDate), 'dd.MM.yy')}`
      : null;

  if (triggerType === 'badge') {
    return (
      <Badge
        variant='outline'
        className={cn('cursor-pointer w-fit', className)}
        onClick={handleClick}
        {...(rest as BadgeProps)}
      >
        {formattedDate || 'Не указано'}
      </Badge>
    );
  }

  return (
    <div className='flex gap-2'>
      <Button
        variant={null}
        size='sm'
        className={cn(
          'p-1 h-6 min-w-6 w-auto gap-1 border border-dashed border-primary/60 text-primary/60',
          className,
        )}
        onClick={handleClick}
        {...(rest as ButtonProps)}
      >
        {formattedDate ? (
          <span className='text-xs font-normal'>{formattedDate}</span>
        ) : (
          <Calendar className='!size-3.5' />
        )}
      </Button>
    </div>
  );
}
