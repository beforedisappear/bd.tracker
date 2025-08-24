'use client';

import { Dialog } from '@/shared/ui/c';
import { DeleteBoardForm } from '../DeleteBoardForm';

import { useShowDeleteBoardModal } from '../../model/useShowDeleteBoardModal';

import { DELETE_BOARD_DESCRIPTION, DELETE_BOARD_TITLE } from '../../constants';

export function DeleteBoardDesktop() {
  const {
    showDeleteBoardModal,
    currentBoardId,
    setShowDeleteBoardModal,
    onCloseModal,
  } = useShowDeleteBoardModal();

  return (
    <Dialog
      title={DELETE_BOARD_TITLE}
      titleClassName='text-center'
      description={DELETE_BOARD_DESCRIPTION}
      descClassName='text-left'
      className='h-48 max-w-96'
      data-testid='delete-board-dialog'
      onOpenChange={setShowDeleteBoardModal}
      open={showDeleteBoardModal}
    >
      <DeleteBoardForm onClose={onCloseModal} boardId={currentBoardId} />
    </Dialog>
  );
}
