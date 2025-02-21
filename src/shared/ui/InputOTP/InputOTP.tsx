'use client';

import { Fragment } from 'react';
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

interface IProps {
  name: string;
  length: number;
  groupSize?: number;
  fieldLabel?: string;
  fieldDescription?: string;
  disabled?: boolean;
}

export function InputOTP(props: IProps) {
  const {
    name,
    length,
    groupSize = 3,
    fieldLabel,
    fieldDescription,
    disabled,
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
          {fieldLabel && <FormLabel>{fieldLabel}</FormLabel>}

          <FormControl>
            <InputOTPContainer
              {...field}
              maxLength={length}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              disabled={disabled}
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

          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
