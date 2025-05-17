import { ScrollArea, Checkbox } from '@/shared/ui/c';
import { TeamMember } from '../../models/types';

interface Props {
  members: TeamMember[];
}

export function TeamMembersFieldContent({ members }: Props) {
  return (
    <ScrollArea type='always' className='h-52'>
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
}
