'use client';

import { Drawer } from '@/shared/ui/c';
import { DeleteBoardForm } from '../DeleteBoardForm';

import { DELETE_BOARD_DESCRIPTION, DELETE_BOARD_TITLE } from '../../constants';

import { useShowDeleteBoardModal } from '../../lib/useShowDeleteBoardModal';

export function DeleteBoardMobile() {
  const {
    showDeleteBoardModal,
    setShowDeleteBoardModal,
    currentBoardId,
    onCloseModal,
  } = useShowDeleteBoardModal();

  return (
    <Drawer
      title={DELETE_BOARD_TITLE}
      titleClassName='text-center'
      description={DELETE_BOARD_DESCRIPTION}
      descClassName='text-center'
      className='h-[250px]'
      open={showDeleteBoardModal}
      onOpenChange={setShowDeleteBoardModal}
    >
      <DeleteBoardForm onClose={onCloseModal} boardId={currentBoardId} />
    </Drawer>
  );
}
