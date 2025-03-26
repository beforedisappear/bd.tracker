'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { SelectTrigger } from './SelectTrigger';
import { SelectContent } from './SelectContent';
import { SelectLabel } from './SelectLabel';
import { SelectItem } from './SelectItem';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form';

import { useFormContext } from 'react-hook-form';

import type { ComponentProps } from 'react';
import type { SelectOption } from './Select.types';

type BaseProps = Omit<
  ComponentProps<typeof SelectContainer>,
  'onValueChange' | 'defaultValue'
>;

interface IProps extends BaseProps {
  name: string;
  placeholder?: string;
  label?: string;
  description?: string;
  selectLabel?: string;
  options: SelectOption[];
}

const SelectContainer = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

export function Select(props: IProps) {
  const {
    name,
    label,
    placeholder,
    description,
    selectLabel,
    options = [],
    ...restProps
  } = props;

  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <SelectContainer
            {...restProps}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}

                {options.map(({ value, name }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectContainer>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
