'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/shared/lib/css';
import { Button } from '../Button/Button';
import { Calendar } from '../Calendar/Calendar';
import { Popover } from '../Popover/Popover';

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  const trigger = (
    <Button
      variant={'outline'}
      className={cn(
        'w-[280px] justify-start text-left font-normal',
        !date && 'text-muted-foreground',
      )}
    >
      <CalendarIcon className='mr-2 h-4 w-4' />
      {date ? format(date, 'PPP') : <span>Pick a date</span>}
    </Button>
  );

  return (
    <Popover className='w-auto p-0' trigger={trigger}>
      <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
    </Popover>
  );
}
