'use client';

import { Dialog } from '@/shared/ui/c';
import { DeleteColumnForm } from '../DeleteColumnForm';

import { useBoardStore, getDeleteColumnModal } from '@/entities/Board';

import {
  DELETE_COLUMN_DESCRIPTION,
  DELETE_COLUMN_TITLE,
} from '../../constants';

export function DeleteColumnDesktop() {
  const {
    setShowDeleteColumnModal,
    showDeleteColumnModal,
    currentColumnId,
    setCurrentColumnId,
  } = useBoardStore(getDeleteColumnModal());

  const onCloseModal = () => {
    setShowDeleteColumnModal(false);
    setCurrentColumnId(null);
  };

  return (
    <Dialog
      title={DELETE_COLUMN_TITLE}
      titleClassName='text-center'
      description={DELETE_COLUMN_DESCRIPTION}
      descClassName='text-left'
      className='h-48 max-w-96'
      data-testid='delete-column-dialog'
      onOpenChange={setShowDeleteColumnModal}
      open={showDeleteColumnModal}
    >
      <DeleteColumnForm onClose={onCloseModal} columnId={currentColumnId} />
    </Dialog>
  );
}
