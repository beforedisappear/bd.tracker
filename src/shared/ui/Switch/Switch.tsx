'use client';

import { PureSwitch } from './PureSwitch';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../Form';

import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/css';

import type { ComponentProps } from 'react';

type BaseProps = Omit<
  ComponentProps<typeof PureSwitch>,
  'checked' | 'onCheckedChange'
>;

interface IProps extends BaseProps {
  name: string;
  label?: string;
  description?: string;
}

export function Switch(props: IProps) {
  const { name, label, description, className, onChange, ...restProps } = props;
  const { control } = useFormContext();

  const isWrapperExists = !!label || !!description;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem
          className={cn({
            ['flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm']:
              isWrapperExists,
            className,
          })}
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
              onChange={v => {
                field.onChange(v);
                if (onChange) onChange(v);
              }}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
