import { LayoutGrid, Pencil, Trash } from 'lucide-react';

import { Button, RenameInput, type RenameInputMethods } from '@/shared/ui/c';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { teamQueries, RenameTeamSchema } from '@/entities/Team';
import { getProfileRoutePath, getTeamRoutePath } from '@/shared/config/routes';
import { errorMessagesMap, getErrorMessage } from '@/shared/lib/error';

import type { UserTeam } from '@/entities/Team';

interface Props {
  team: UserTeam;
  isCurrentTeam: boolean;
  onDeleteTeam?: (id: string, slug: string) => void;
}

export function SelectTeamAdvancedItem(props: Props) {
  const { team, isCurrentTeam, onDeleteTeam } = props;

  const { push } = useRouter();
  const methodsRef = useRef<RenameInputMethods>(null);

  const isAdmin = team.admin;
  const isOwner = team.owned;

  const { mutateAsync: renameTeam } = useMutation(teamQueries.renameTeam());

  const onRename = (name: string) => {
    renameTeam({ idOrSlug: team.id, name })
      .then(({ data: { slug } }) => {
        //if the team is the current team, then update slug in the url
        if (isCurrentTeam) push(getProfileRoutePath(slug), { scroll: false });
      })
      .catch(e => {
        toast.error(getErrorMessage(e));
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
      className='flex items-center gap-2 px-1 h-6'
      onClick={onRedirectToTeam}
    >
      <LayoutGrid className='w-4 h-4' />

      <RenameInput
        methodsRef={methodsRef}
        initialName={team.name}
        schema={RenameTeamSchema}
        onRename={onRename}
      />

      <div data-ignore='true' className='flex items-center gap-2 ml-auto'>
        <Button
          variant='ghost'
          size='icon'
          className='w-6 h-6 group'
          onClick={() =>
            isAdmin || isOwner
              ? methodsRef.current?.onStartEditing?.()
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
