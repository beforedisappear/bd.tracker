'use client';

import { cn } from '@/shared/lib/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  DayPicker,
  isDayPickerDefault,
  isDayPickerMultiple,
  isDayPickerRange,
  isDayPickerSingle,
} from 'react-day-picker';

import { calendarClassNames } from './Calendar.config';
import { ru } from 'date-fns/locale';

import type { ComponentProps } from 'react';

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar(props: CalendarProps) {
  const { className, classNames, ...restProps } = props;

  const baseProps = {
    locale: ru,
    className: cn('p-3', className),
    classNames: { ...calendarClassNames(props.mode), ...classNames },
    fixedWeeks: true,
    showOutsideDays: true,
    components: {
      IconLeft: ({ className, ...restProps }: { className?: string }) => (
        <ChevronLeft className={cn('h-4 w-4', className)} {...restProps} />
      ),

      IconRight: ({ className, ...restProps }: { className?: string }) => (
        <ChevronRight className={cn('h-4 w-4', className)} {...restProps} />
      ),
    },
  };

  if (isDayPickerMultiple(restProps))
    return <DayPicker {...baseProps} {...restProps} mode='multiple' />;
  else if (isDayPickerDefault(restProps))
    return <DayPicker {...baseProps} {...restProps} mode='default' />;
  else if (isDayPickerRange(restProps))
    return <DayPicker {...baseProps} {...restProps} mode='range' />;
  else if (isDayPickerSingle(restProps))
    return <DayPicker {...baseProps} {...restProps} mode='single' />;
}
Calendar.displayName = 'Calendar';

export { Calendar };
