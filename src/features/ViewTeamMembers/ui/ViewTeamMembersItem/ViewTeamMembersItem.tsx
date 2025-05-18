import { Crown, UserRoundCog } from 'lucide-react';

import { getColorByFirstLetter } from '@/shared/lib/css';
import { getInitials } from '@/shared/lib/data';
import { Avatar } from '@/shared/ui/s';

import type { TeamMember } from '@/entities/Team';

interface Props {
  member: TeamMember;
  onOpenProfile: (memberId: string) => void;
}

export function ViewTeamMembersItem(props: Props) {
  const { member, onOpenProfile } = props;

  return (
    <div
      className='flex items-center gap-4 py-2 px-3 h-10 transition-colors cursor-pointer
    hover:bg-zinc-200 dark:hover:bg-zinc-800'
      onClick={() => onOpenProfile(member.id)}
    >
      <Avatar
        src={''}
        alt={member.name}
        fallback={getInitials(member.name)}
        className='grid place-items-center w-6 h-6 text-xs'
        style={{ backgroundColor: getColorByFirstLetter(member.name) }}
      />

      <div className='flex items-center gap-2 w-64'>
        <span className='line-clamp-1 text-sm'>{member.name}</span>
        {member.isOwner && <Crown className='w-4 h-4 text-yellow-500' />}
        {member.isAdmin && <UserRoundCog className='w-4 h-4 text-blue-500' />}
      </div>

      <span className='line-clamp-1 w-64 text-sm'>{member.email}</span>
    </div>
  );
}
