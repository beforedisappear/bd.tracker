'use client';

import { cn } from '@/shared/lib/css';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form';
import { PureInput } from './PureInput';

import { useFormContext } from 'react-hook-form';

import type { ComponentProps } from 'react';

interface IProps extends ComponentProps<typeof PureInput> {
  name: string;
  label?: string;
  description?: string;
}

const Input = (props: IProps) => {
  const { name, label, description, className, ...restProps } = props;

  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={''}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <PureInput {...restProps} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Input };
