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
  errorMessageTestId?: string;
}

const Input = (props: IProps) => {
  const {
    name,
    type = 'text',
    label,
    description,
    className,
    onChange,
    disabled,
    errorMessageTestId,
    ...restProps
  } = props;

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
            <PureInput
              {...restProps}
              {...field}
              type={type}
              disabled={disabled}
              onChange={v => {
                field.onChange(v);
                if (onChange) onChange(v);
              }}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage data-testid={errorMessageTestId} />
        </FormItem>
      )}
    />
  );
};

export { Input };
