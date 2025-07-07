'use client';

import { BasicDeleteForm } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useProject, useTenant } from '@/shared/lib/navigation';

import { boardQueries } from '@/entities/Board';

import {
  getProjectByIdRoutePath,
  getTeamRoutePath,
} from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';
import { queryClient } from '@/shared/config/query';
import { toast } from 'sonner';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

import type { GetAllBoardsDtoRes } from '@/entities/Board';

interface Props {
  onClose: () => void;
  boardId: string | null;
}

export function DeleteBoardForm(props: Props) {
  const { onClose, boardId } = props;

  const { push } = useRouter();
  const { isMobile, isDesktop } = useDeviceType();
  const tenant = useTenant();
  const { projectId } = useProject();

  const { mutateAsync: deleteBoard, isPending } = useMutation(
    boardQueries.deleteBoard(),
  );

  const onDelete = () => {
    if (!boardId) return;

    const allBoards = queryClient.getQueryData<GetAllBoardsDtoRes>(
      boardQueries.allBoards(projectId),
    );

    const anotherBoardId = allBoards?.find(board => board.id !== boardId)?.id;

    deleteBoard({ projectId, boardId })
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .then(() => {
        if (!anotherBoardId) return push(getTeamRoutePath(tenant));
        push(getProjectByIdRoutePath(tenant, projectId, anotherBoardId));
      })
      .catch(e => toast.error(getErrorMessage(e)))
      .finally(() => onClose());
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
