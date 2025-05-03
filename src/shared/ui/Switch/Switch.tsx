'use client';

import { cn } from '@/shared/lib/css';

import { PureSwitch } from './PureSwitch';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../Form';

import { useFormContext } from 'react-hook-form';

import type { ComponentProps } from 'react';

type BaseProps = Omit<
  ComponentProps<typeof PureSwitch>,
  'checked' | 'onChange'
>;

interface IProps extends BaseProps {
  name: string;
  label?: string;
  description?: string;
}

export function Switch(props: IProps) {
  const { name, label, description, className, onCheckedChange, ...restProps } =
    props;
  const { control } = useFormContext();

  const isWrapperExists = !!label || !!description;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem
          className={cn(
            {
              ['flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm']:
                isWrapperExists,
            },
            className,
          )}
        >
          {isWrapperExists && (
            <div className='space-y-0.5'>
              {label && <FormLabel>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          )}

          <FormControl>
            <PureSwitch
              {...restProps}
              onCheckedChange={v => {
                field.onChange(v);
                if (onCheckedChange) onCheckedChange(v);
              }}
              checked={field.value}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
