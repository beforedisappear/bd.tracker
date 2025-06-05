'use client';

import { BasicDeleteForm } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useProject, useTenant } from '@/shared/lib/navigation';

import { boardQueries } from '@/entities/Board';
import { getProjectByIdRoutePath } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

interface Props {
  onClose: () => void;
}

export function DeleteBoardForm(props: Props) {
  const { onClose } = props;

  const { push } = useRouter();
  const { isMobile, isDesktop } = useDeviceType();
  const tenant = useTenant();
  const { projectId, boardId } = useProject();

  const { mutateAsync: deleteBoard, isPending } = useMutation(
    boardQueries.deleteBoard(),
  );

  const onDelete = () => {
    if (!boardId) return;

    deleteBoard({ projectId, boardId })
      .then(() => onClose())
      .then(() => push(getProjectByIdRoutePath(tenant, projectId)))
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .catch(e => toast.error(getErrorMessage(e)));
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
