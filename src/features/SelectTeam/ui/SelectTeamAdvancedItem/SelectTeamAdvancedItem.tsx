import { LayoutGrid, Pencil, Trash } from 'lucide-react';
import { cn } from '@/shared/lib/css';

import { Button } from '@/shared/ui/c';

import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { teamQueries, RenameTeamSchema } from '@/entities/Team';
import { getProfileRoutePath, getTeamRoutePath } from '@/shared/config/routes';
import {
  errorMessagesMap,
  getErrorMessage,
  getZodErrorMessage,
} from '@/shared/lib/error';

import { ZodError } from 'zod';
import type { UserTeam } from '@/entities/Team';
import type { FocusEvent } from 'react';

interface Props {
  team: UserTeam;
  isCurrentTeam: boolean;
  onDeleteTeam?: (id: string, slug: string) => void;
}

export function SelectTeamAdvancedItem(props: Props) {
  const { team, isCurrentTeam, onDeleteTeam } = props;

  const isAdmin = team.admin;
  const isOwner = team.owned;
  const { push } = useRouter();

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

    try {
      RenameTeamSchema.parse({ name: e.target.value });
    } catch (error) {
      if (error instanceof ZodError) toast.error(getZodErrorMessage(error));
      setTeamName(team.name);
      return;
    }

    const value = e.target.value;

    if (value === team.name) return;

    renameTeam({ idOrSlug: team.id, name: e.target.value })
      .then(({ data: { slug } }) => {
        //if the team is the current team, then update slug in the url
        if (isCurrentTeam) push(getProfileRoutePath(slug), { scroll: false });
      })
      .catch(e => {
        toast.error(getErrorMessage(e));
        setTeamName(team.name);
      });
  };

  const onRedirectToTeam = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const ignoredElement = target.closest('[data-ignore="true"]');

    if (ignoredElement) return;

    push(getTeamRoutePath(team.slug), { scroll: false });
  };

  return (
    <div
      key={team.id}
      className='flex items-center gap-2 px-1 h-6
      hover:bg-primary/5'
      onClick={isEditing ? undefined : onRedirectToTeam}
    >
      <LayoutGrid className='w-4 h-4' />

      <input
        type='text'
        ref={inputRef}
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
        onBlur={onEndEditing}
        readOnly={!isEditing}
        className={cn(
          'border-none outline-none bg-transparent w-full cursor-pointer',
          { 'cursor-text': isEditing },
        )}
      />

      <div data-ignore='true' className='flex items-center gap-2 ml-auto'>
        <Button
          variant='ghost'
          size='icon'
          className='w-6 h-6 group'
          onClick={() =>
            isAdmin || isOwner
              ? onStartEditing()
              : toast.error(errorMessagesMap['1024'])
          }
        >
          <Pencil className='w-4 h-4 group-hover:text-blue-800' />
        </Button>

        {onDeleteTeam && (
          <Button
            variant='ghost'
            size='icon'
            className='w-6 h-6 group'
            onClick={() =>
              isOwner
                ? onDeleteTeam(team.id, team.slug)
                : toast.error(errorMessagesMap['1023'])
            }
          >
            <Trash className='w-4 h-4 group-hover:text-red-800' />
          </Button>
        )}
      </div>
    </div>
  );
}
