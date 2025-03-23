'use client';

import { cn } from '@/shared/lib/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { DayPicker } from 'react-day-picker';

import { calendarClassNames } from './Calendar.config';
import { ru } from 'date-fns/locale';

import type { ComponentProps } from 'react';

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar(props: CalendarProps) {
  const { className, classNames, mode, ...restProps } = props;

  return (
    <DayPicker
      locale={ru}
      className={cn('p-3', className)}
      classNames={{ ...calendarClassNames(mode), ...classNames }}
      fixedWeeks
      showOutsideDays
      components={{
        // eslint-disable-next-line react/prop-types
        IconLeft: ({ className, ...restProps }) => (
          <ChevronLeft className={cn('h-4 w-4', className)} {...restProps} />
        ),
        // eslint-disable-next-line react/prop-types
        IconRight: ({ className, ...restProps }) => (
          <ChevronRight className={cn('h-4 w-4', className)} {...restProps} />
        ),
      }}
      {...restProps}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
