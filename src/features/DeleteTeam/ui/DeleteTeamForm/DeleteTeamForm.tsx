'use client';

import { Button } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import {
  getDeletingTeam,
  useTeamStore,
  getDeleteTeamModal,
  teamQueries,
} from '@/entities/Team';
import { useParams, useRouter } from 'next/navigation';

import { getHomeRoutePath } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

import { DELETE_TEAM_DESCRIPTION } from '../../constants';
import {
  SENDING_DATA_MESSAGE,
  SUCCESSFUL_SENDING_MESSAGE,
} from '@/shared/constants';

interface Props {}

export function DeleteTeamForm({}: Props) {
  const { tenant } = useParams<{ tenant: string }>()!;
  const { push } = useRouter();
  const { setShowDeleteTeamModal } = useTeamStore(getDeleteTeamModal());
  const { setDeletingTeam, deletingTeam } = useTeamStore(getDeletingTeam());

  const { mutateAsync: deleteTeam, isPending } = useMutation(
    teamQueries.deleteTeam(),
  );

  const onDelete = () => {
    if (!deletingTeam) return;

    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    deleteTeam({ idOrSlug: deletingTeam.id })
      .then(() => setShowDeleteTeamModal(false))
      .then(() => setDeletingTeam(null))
      .then(() =>
        tenant === deletingTeam.slug ? push(getHomeRoutePath()) : undefined,
      )
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE, { id: toastId }))
      .catch(e => toast.error(getErrorMessage(e), { id: toastId }));
  };

  return (
    <div>
      <p className='text-center text-muted-foreground mb-6'>
        {DELETE_TEAM_DESCRIPTION}
      </p>

      <Button
        type='submit'
        variant='destructive'
        className='w-full'
        disabled={isPending}
        onClick={onDelete}
      >
        <span>Удалить</span>
      </Button>
    </div>
  );
}
