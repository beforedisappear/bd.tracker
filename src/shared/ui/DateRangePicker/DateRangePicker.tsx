'use client';

import { cn } from '@/shared/lib/css';
import { CalendarIcon } from 'lucide-react';

import { DateRange } from 'react-day-picker';
import { Button } from '../Button/Button';
import { Calendar } from '../Calendar/Calendar';
import { Popover } from '../Popover/Popover';

import { format } from 'date-fns';
import { useState, type HTMLAttributes } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form';
import { useFormContext } from 'react-hook-form';

type Props = HTMLAttributes<HTMLDivElement> & {
  name: string;
  label?: string;
  description?: string;
};

export function DateRangePicker(props: Props) {
  const { name, label, description, className } = props;

  const {
    control,
    setValue,
    formState: { defaultValues },
  } = useFormContext<{
    [key: string]: DateRange;
  }>();

  console.log('defaultValues', defaultValues);

  const [range, setRange] = useState<DateRange | undefined>(
    defaultValues ? (defaultValues[name] as DateRange) : undefined,
  );

  const handleSelect = (newSelected: DateRange | undefined) => {
    if (!newSelected) return;
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
          <FormItem className='flex flex-col w-full'>
            {label && <FormLabel>{label}</FormLabel>}

            <Popover trigger={trigger} className='w-fit'>
              <Calendar
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
