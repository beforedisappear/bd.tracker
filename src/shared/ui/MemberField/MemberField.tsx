import { ScrollArea, Checkbox } from '@/shared/ui/c';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/css';

import type { CheckedState } from '@radix-ui/react-checkbox';

type Member = {
  id: string;
  name: string;
};

interface Props {
  members: Member[];
  isExpanded?: boolean;
  inputName?: string;
  onCheckedChange?: (checked: CheckedState, memberId: string) => void;
  customHeight?: number;
  disabled?: boolean;
}

export const MembersField = memo((props: Props) => {
  const {
    members = [],
    isExpanded,
    customHeight,
    inputName = 'membersIds',
    onCheckedChange,
    disabled = false,
  } = props;

  const { setValue } = useFormContext();

  if (members.length === 0) return null;

  const onSetAll = (checked: CheckedState) => {
    const values = Object.fromEntries(
      members.map(member => [member.id, checked]),
    );
    setValue(inputName, values);
  };

  return (
    <ScrollArea
      type='always'
      style={{ height: customHeight }}
      className={cn('h-40 pr-4 mr-[-1rem]', { ['h-52']: isExpanded })}
    >
      <Checkbox
        name='all'
        label='Все участники'
        className='h-6 items-center'
        withRightLabel
        labelClassName='font-normal text-base truncate max-w-64'
        onCheckedChange={onSetAll}
        disabled={disabled}
      />

      <div className='border-t border-y-accent-foreground/70 my-1 rounded-full' />

      {members.map(member => (
        <Checkbox
          key={member.id}
          name={`${inputName}.${member.id}`}
          label={member.name}
          className='h-6 items-center'
          labelClassName='font-normal text-base truncate max-w-64'
          withRightLabel
          onCheckedChange={checked => {
            onCheckedChange?.(checked, member.id);
          }}
          disabled={disabled}
        />
      ))}
    </ScrollArea>
  );
});

MembersField.displayName = 'MembersField';
