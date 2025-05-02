'use client';

import { cn } from '@/shared/lib/css';
import { CalendarIcon } from 'lucide-react';

import { DateRange } from 'react-day-picker';
import { Button } from '../Button/Button';
import { Calendar, type CalendarProps } from '../Calendar/Calendar';
import { Popover } from '../Popover/Popover';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form';

import { useState, type HTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import { format } from 'date-fns';
import { isDisabledDateInRange } from './DateRangePicker.utils';

type ExcludedProps = 'mode' | 'selected' | 'onSelect' | 'numberOfMonths';

type Props = HTMLAttributes<HTMLDivElement> & {
  name: string;
  label?: string;
  description?: string;
  calendar?: Omit<CalendarProps, ExcludedProps>;
};

export function DateRangePicker(props: Props) {
  const { name, label, description, calendar, className } = props;

  const {
    control,
    setValue,
    resetField,
    formState: { defaultValues },
  } = useFormContext<{
    [key: string]: DateRange;
  }>();

  const [range, setRange] = useState<DateRange | undefined>(
    defaultValues ? (defaultValues[name] as DateRange) : undefined,
  );

  const handleSelect = (newSelected: DateRange | undefined) => {
    if (!newSelected) return;

    //reset field if disabled date is in selected range
    if (newSelected.from && newSelected.to && calendar?.disabled) {
      const disabledDate = isDisabledDateInRange(
        { from: newSelected.from, to: newSelected.to },
        calendar.disabled,
      );

      if (disabledDate) {
        setRange({ from: undefined, to: undefined });
        resetField(name);
        return;
      }
    }

    setRange(newSelected);
    setValue(name, newSelected);
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const trigger = (
          <FormControl>
            <Button
              id='date'
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !field.value && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />
              {field?.value?.from ? (
                field?.value?.to ? (
                  `${format(field.value.from, 'dd.MM.yyyy')} - ${format(field.value.to, 'dd.MM.yyyy')}`
                ) : (
                  format(field.value.from, 'dd.MM.yyyy')
                )
              ) : (
                <span>Выберите даты</span>
              )}
            </Button>
          </FormControl>
        );
        return (
          <FormItem className={cn('flex flex-col w-full', className)}>
            {label && <FormLabel>{label}</FormLabel>}

            <Popover trigger={trigger} className='w-fit'>
              <Calendar
                {...calendar}
                initialFocus
                mode='range'
                defaultMonth={range?.from}
                selected={range}
                onSelect={handleSelect}
                numberOfMonths={2}
              />
            </Popover>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
