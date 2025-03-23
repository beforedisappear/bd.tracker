'use client';

import { cn } from '@/shared/lib/css';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form';
import { Button } from '../Button/Button';
import { Popover } from '../Popover/Popover';
import { Calendar, type CalendarProps } from '../Calendar/Calendar';

import type { DayPickerBase } from 'react-day-picker';

type Props = {
  name: string;
  label?: string;
  description?: string;
  disabled?: DayPickerBase['disabled'];
} & CalendarProps;

export function DatePicker(props: Props) {
  const { name, label, description, disabled, ...restProps } = props;

  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const trigger = (
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value ? (
                format(field.value, 'dd.MM.yyyy')
              ) : (
                <span>Выбрать дату</span>
              )}

              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </FormControl>
        );

        return (
          <FormItem className='flex flex-col w-full'>
            {label && <FormLabel>{label}</FormLabel>}

            <Popover trigger={trigger}>
              <Calendar
                mode='single'
                selected={field.value}
                onDayClick={field.onChange}
                disabled={disabled}
                initialFocus
                {...restProps}
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
