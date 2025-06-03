'use client';

import { BasicDeleteForm } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useTenant } from '@/shared/lib/navigation';

import { boardQueries } from '@/entities/Board';
import { getProjectByIdRoutePath } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';
import {
  SENDING_DATA_MESSAGE,
  SUCCESSFUL_SENDING_MESSAGE,
} from '@/shared/constants';

interface Props {
  boardId: string | null;
  onClose: () => void;
}

export function DeleteBoardForm(props: Props) {
  const { onClose, boardId } = props;

  const { push } = useRouter();
  const { isMobile, isDesktop } = useDeviceType();
  const tenant = useTenant();

  const { mutateAsync: deleteBoard, isPending } = useMutation(
    boardQueries.deleteBoard(),
  );

  const onDelete = () => {
    if (!boardId) return;

    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    deleteBoard({ boardId })
      .then(() => onClose())
      .then(() => push(getProjectByIdRoutePath(tenant, boardId)))
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE, { id: toastId }))
      .catch(e => toast.error(getErrorMessage(e), { id: toastId }));
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
