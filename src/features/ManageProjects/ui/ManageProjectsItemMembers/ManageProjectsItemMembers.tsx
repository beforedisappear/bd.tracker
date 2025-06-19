import { Avatar } from '@/shared/ui/Avatar/Avatar';

import type { ProjectMember } from '@/entities/Project';

interface Props {
  members: ProjectMember[];
}

export function ManageProjectsItemMembers({ members }: Props) {
  return (
    <div className='flex items-center w-fit'>
      {members.slice(0, 5).map(member => (
        <Avatar
          key={member.id}
          src={''}
          alt={member.name}
          initials={member.name}
          className='grid place-content-center w-6 h-6 text-xs mr-[-6px] border-2 border-muted'
        />
      ))}

      {members.length > 5 && (
        <span className='flex items-center justify-center w-7 h-6 text-xs text-muted-foreground ml-[2px] rounded-full bg-muted'>
          +{members.length - 5}
        </span>
      )}
    </div>
  );
}
