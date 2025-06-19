import { Calendar } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';
import type { MouseEvent } from 'react';
import { format } from 'date-fns';

interface Props extends ButtonProps {
  startDate: string | null;
  endDate: string | null;
}

export function BoardTaskDateRangeMenuTrigger(props: Props) {
  const { onClick, startDate, endDate, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  const formattedDate =
    startDate && endDate
      ? `${format(new Date(startDate), 'dd.MM.yy')} - ${format(new Date(endDate), 'dd.MM.yy')}`
      : null;

  return (
    <div className='flex gap-2'>
      <Button
        variant={null}
        size='sm'
        className='p-1 h-6 min-w-6 w-auto gap-1 border border-dashed border-primary/60 text-primary/60'
        onClick={handleClick}
        {...rest}
      >
        {!formattedDate && <Calendar className='!size-3.5' />}
        {formattedDate && (
          <span className='text-xs font-normal'>{formattedDate}</span>
        )}
      </Button>
    </div>
  );
}
