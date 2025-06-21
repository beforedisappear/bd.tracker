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
import { PureCheckbox } from './PureCheckbox';

import { useFormContext } from 'react-hook-form';

import type { ComponentProps } from 'react';

type BaseProps = Omit<
  ComponentProps<typeof PureCheckbox>,
  'checked' | 'onChange'
>;

interface IProps extends BaseProps {
  name: string;
  label?: React.ReactNode;
  description?: string;
  errorMessageTestId?: string;
  inputClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  hideErrorMessage?: boolean;
  withRightLabel?: boolean;
}

export const Checkbox = (props: IProps) => {
  const {
    name,
    label,
    description,
    className,
    onCheckedChange,
    onBlur,
    disabled,
    errorMessageTestId,
    inputClassName,
    labelClassName,
    descriptionClassName,
    hideErrorMessage = false,
    withRightLabel = false,
    ...restProps
  } = props;

  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-start gap-2 space-y-0',
            {
              ['flex-row-reverse items-center justify-between']: withRightLabel,
            },
            className,
          )}
        >
          <FormControl>
            <PureCheckbox
              {...restProps}
              {...field}
              defaultChecked={field.value}
              checked={field.value}
              disabled={disabled}
              onCheckedChange={v => {
                field.onChange(v);
                if (onCheckedChange) onCheckedChange(v);
              }}
              onBlur={e => {
                field.onBlur();
                if (onBlur) onBlur(e);
              }}
              className={inputClassName}
            />
          </FormControl>

          <div className='flex space-y-1 leading-none'>
            {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
            {description && (
              <FormDescription className={descriptionClassName}>
                {description}
              </FormDescription>
            )}
          </div>

          {!hideErrorMessage && (
            <FormMessage data-testid={errorMessageTestId} />
          )}
        </FormItem>
      )}
    />
  );
};
