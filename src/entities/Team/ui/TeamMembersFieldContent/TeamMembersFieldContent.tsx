import { ScrollArea, Checkbox } from '@/shared/ui/c';
import { TeamMember } from '../../models/types';
import { memo } from 'react';

interface Props {
  members: TeamMember[];
  withSearch?: boolean;
}

export const TeamMembersFieldContent = memo((props: Props) => {
  const { members = [], withSearch } = props;

  return (
    <ScrollArea type='always' className={withSearch ? 'h-40' : 'h-52'}>
      {members.map(member => (
        <Checkbox
          key={member.id}
          name={`membersIds.${member.id}`}
          label={member.name}
          className='h-6 items-center'
          labelClassName='font-normal text-base'
        />
      ))}
    </ScrollArea>
  );
});

TeamMembersFieldContent.displayName = 'TeamMembersFieldContent';
