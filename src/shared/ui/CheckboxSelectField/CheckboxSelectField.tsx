'use client';

import { ScrollArea, Checkbox } from '@/shared/ui/c';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/css';

import type { CheckedState } from '@radix-ui/react-checkbox';

type Item = {
  id: string;
  name: string;
};

interface Props<T extends Item> {
  items: T[];
  inputName: string;
  allLabel: string;
  isExpanded?: boolean;
  onCheckedChange?: (checked: CheckedState, memberId: string) => void;
  customHeight?: number;
  disabled?: boolean;
  offAll?: boolean;
}

export const CheckboxSelectField = memo(<T extends Item>(props: Props<T>) => {
  const {
    items = [],
    isExpanded,
    customHeight,
    inputName,
    allLabel,
    disabled = false,
    onCheckedChange,
    offAll,
  } = props;

  const { setValue, getValues } = useFormContext();

  if (items.length === 0) return null;

  const onSetAll = (checked: CheckedState) => {
    const values = Object.fromEntries(items.map(item => [item.id, checked]));
    setValue(inputName, values);
  };

  return (
    <ScrollArea
      type='always'
      style={{ height: customHeight }}
      className={cn('h-40 pr-4 -mr-4 mobile:h-full mobile:max-h-[400px]', {
        ['h-52']: isExpanded,
      })}
    >
      {!offAll && (
        <>
          <Checkbox
            key='all'
            name='all'
            label={allLabel}
            className='h-6 items-center'
            withRightLabel
            labelClassName='font-normal text-base truncate max-w-64'
            onCheckedChange={onSetAll}
            disabled={disabled}
          />

          <div className='border-b-2 border-y-primary/50 my-1 rounded-full' />
        </>
      )}

      {items.map(item => (
        <Checkbox
          key={item.id}
          name={`${inputName}.${item.id}`}
          label={item.name}
          className='h-6 items-center'
          labelClassName='font-normal text-base truncate max-w-64'
          withRightLabel
          disabled={disabled}
          onCheckedChange={checked => {
            onCheckedChange?.(checked, item.id);

            const allChecked = Object.values(getValues(inputName)).every(
              v => v === true,
            );

            setValue('all', allChecked);
          }}
        />
      ))}
    </ScrollArea>
  );
});

CheckboxSelectField.displayName = 'CheckboxSelectField';
