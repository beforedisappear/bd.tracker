'use client';

import { Drawer } from '@/shared/ui/c';
import { DeleteBoardForm } from '../DeleteBoardForm';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { DELETE_BOARD_DESCRIPTION, DELETE_BOARD_TITLE } from '../../constants';

import { getDeleteBoardModal } from '@/entities/Board';

export function DeleteBoardMobile() {
  const { setShowDeleteBoardModal, showDeleteBoardModal, deletingBoardId } =
    usePrivateGlobalStore(getDeleteBoardModal());

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
      <DeleteBoardForm
        onClose={() => setShowDeleteBoardModal(false)}
        boardId={deletingBoardId}
      />
    </Drawer>
  );
}
