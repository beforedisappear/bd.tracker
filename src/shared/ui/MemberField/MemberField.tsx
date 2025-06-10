import { ScrollArea, Checkbox } from '@/shared/ui/c';
import { memo } from 'react';
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
}

export const MembersField = memo((props: Props) => {
  const {
    members = [],
    isExpanded,
    customHeight,
    inputName = 'membersIds',
    onCheckedChange,
  } = props;

  // TODO: add "all" checkbox
  return (
    <ScrollArea
      type='always'
      style={{ height: customHeight }}
      className={isExpanded ? 'h-40' : 'h-52'}
    >
      {members.map(member => (
        <Checkbox
          key={member.id}
          name={`${inputName}.${member.id}`}
          label={member.name}
          className='h-6 items-center'
          labelClassName='font-normal text-base truncate max-w-64'
          onCheckedChange={checked => {
            onCheckedChange?.(checked, member.id);
          }}
        />
      ))}
    </ScrollArea>
  );
});

MembersField.displayName = 'MembersField';
