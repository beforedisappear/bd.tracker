'use client';

import { InputOTPContainer } from './InputOTPContainer';
import { InputOTPGroup } from './InputOTPGroup';
import { InputOTPSeparator } from './InputOTPSeparator';
import { InputOTPSlot } from './InputOTPSlot';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useFormContext } from 'react-hook-form';

import { type ComponentProps, Fragment } from 'react';

type ExcludedProps = 'maxLength' | 'render' | 'pattern';

type Props = {
  name: string;
  length: number;
  groupSize?: number;
  label?: string;
  description?: string;
  disabled?: boolean;
} & Omit<ComponentProps<typeof InputOTPContainer>, ExcludedProps>;

export function InputOTP(props: Props) {
  const {
    name,
    length,
    groupSize = 3,
    label,
    description,
    disabled,
    onChange,
    ...restProps
  } = props;

  if (length <= 0 || groupSize <= 0) {
    throw new Error('groupSize и separatorStep can only be positive ');
  }

  const numberOfGroups = Math.ceil(length / groupSize);

  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <InputOTPContainer
              {...restProps}
              {...field}
              maxLength={length}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              disabled={disabled}
              onChange={v => {
                field.onChange(v);
                if (onChange) onChange(v);
              }}
            >
              {new Array(numberOfGroups).fill('_').map((_, groupIndex) => {
                const slotsInGroup =
                  groupIndex === numberOfGroups - 1
                    ? length - groupIndex * groupSize
                    : groupSize;

                const isNotLast = numberOfGroups - 1 !== groupIndex;

                return (
                  <Fragment key={groupIndex}>
                    <InputOTPGroup>
                      {new Array(slotsInGroup).fill('_').map((_, slotIndex) => {
                        const index = groupIndex * groupSize + slotIndex;

                        return <InputOTPSlot key={index} index={index} />;
                      })}
                    </InputOTPGroup>

                    {isNotLast && <InputOTPSeparator />}
                  </Fragment>
                );
              })}
            </InputOTPContainer>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
