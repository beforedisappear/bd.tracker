'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { SelectTrigger } from './SelectTrigger';
import { SelectContent } from './SelectContent';
import { SelectLabel } from './SelectLabel';
import { SelectItem } from './SelectItem';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form';

type Option = { value: string; name: string };

type IProps = {
  name: string;
  placeholder?: string;
  fieldLabel?: string;
  fieldDescription?: string;
  label?: string;
  options: Option[];
};

const SelectContainer = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

export function Select(props: IProps) {
  const {
    name,
    fieldLabel,
    placeholder,
    fieldDescription,
    label,
    options = [],
  } = props;

  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {fieldLabel && <FormLabel>{fieldLabel}</FormLabel>}
          <SelectContainer
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                {label && <SelectLabel>{label}</SelectLabel>}

                {options.map(({ value, name }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectContainer>

          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
