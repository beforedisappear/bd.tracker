'use client';

import { BasicDeleteForm } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import {
  getDeletingTeam,
  useTeamStore,
  getDeleteTeamModal,
  teamQueries,
} from '@/entities/Team';
import { useTenant } from '@/shared/lib/navigation';
import { useRouter } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { getHomeRoutePath } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

import {
  SENDING_DATA_MESSAGE,
  SUCCESSFUL_SENDING_MESSAGE,
} from '@/shared/constants';

interface Props {
  onClose: () => void;
}

export function DeleteTeamForm(props: Props) {
  const { onClose } = props;

  const tenant = useTenant();
  const { push } = useRouter();
  const { isMobile, isDesktop } = useDeviceType();
  const { setShowDeleteTeamModal } = useTeamStore(getDeleteTeamModal());
  const { setDeletingTeam, deletingTeam } = useTeamStore(getDeletingTeam());

  const { mutateAsync: deleteTeam, isPending } = useMutation(
    teamQueries.deleteTeam(),
  );

  const onCloseModal = () => {
    setShowDeleteTeamModal(false);
    setDeletingTeam(null);
  };

  const onDelete = () => {
    if (!deletingTeam) return;

    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    deleteTeam({ idOrSlug: deletingTeam.id })
      .then(() => {
        //to prevent incorrect behavior with delete tenant param
        if (tenant === deletingTeam.slug) push(getHomeRoutePath());
      })
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE, { id: toastId }))
      .catch(e => toast.error(getErrorMessage(e), { id: toastId }))
      .finally(() => onCloseModal());
  };

  return (
    <BasicDeleteForm
      isDesktop={isDesktop}
      isMobile={isMobile}
      onClose={onClose}
      onDelete={onDelete}
      isPending={isPending}
    />
  );
}
