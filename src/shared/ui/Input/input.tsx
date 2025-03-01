'use client';

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
  fieldLabel?: string;
  fieldDescription?: string;
}

const Input = (props: IProps) => {
  const { name, fieldLabel, fieldDescription, ...restProps } = props;

  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={''}
      render={({ field }) => (
        <FormItem>
          {fieldLabel && <FormLabel>{fieldLabel}</FormLabel>}

          <FormControl>
            <PureInput {...restProps} {...field} />
          </FormControl>

          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Input };
