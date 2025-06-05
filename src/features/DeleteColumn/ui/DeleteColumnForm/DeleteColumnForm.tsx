'use client';

import { BasicDeleteForm } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useProject } from '@/shared/lib/navigation';

import { columnQueries } from '@/entities/Board';

import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';
import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

interface Props {
  columnId: string | null;
  onClose: () => void;
}

export function DeleteColumnForm(props: Props) {
  const { onClose, columnId } = props;

  const { boardId } = useProject();
  const { isMobile, isDesktop } = useDeviceType();

  const { mutateAsync: deleteColumn, isPending } = useMutation(
    columnQueries.deleteColumn(),
  );

  const onDelete = () => {
    if (!columnId || !boardId) return;

    deleteColumn({ columnId, boardId })
      .then(() => onClose())
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
