import { LayoutGrid, Pencil, Trash } from 'lucide-react';

import { Button } from '@/shared/ui/c';

import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { teamQueries } from '@/entities/Team';
import { getProfileRoutePath } from '@/shared/config/routes';

import type { Team } from '@/entities/Team';
import type { FocusEvent } from 'react';

interface Props {
  team: Team;
  isCurrentTeam: boolean;
  onDelete?: (id: string) => void;
}

export function SelectTeamAdvancedItem(props: Props) {
  const { team, isCurrentTeam, onDelete } = props;
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [teamName, setTeamName] = useState(team.name);

  const { mutateAsync: renameTeam } = useMutation(teamQueries.renameTeam());

  const onStartEditing = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onEndEditing = (e: FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);

    const value = e.target.value;

    if (value === team.name) return;

    renameTeam({ idOrSlug: team.id, name: e.target.value }).then(
      ({ data: { slug } }) => {
        //if the team is the current team, then update slug in the url
        if (isCurrentTeam)
          router.push(getProfileRoutePath(slug), { scroll: false });
      },
    );
  };

  return (
    <div key={team.id} className='flex items-center gap-2 h-6'>
      <LayoutGrid className='w-4 h-4' />
      <input
        type='text'
        ref={inputRef}
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
        onBlur={onEndEditing}
        disabled={!isEditing}
        className='border-none outline-none bg-transparent w-full'
      />

      <div className='flex items-center gap-2 ml-auto'>
        <Button
          variant='ghost'
          size='icon'
          className='w-6 h-6 group'
          onClick={onStartEditing}
        >
          <Pencil className='w-4 h-4 group-hover:text-blue-800' />
        </Button>

        {onDelete && (
          <Button
            variant='ghost'
            size='icon'
            className='w-6 h-6 group'
            onClick={() => onDelete(team.id)}
          >
            <Trash className='w-4 h-4 group-hover:text-red-800' />
          </Button>
        )}
      </div>
    </div>
  );
}
