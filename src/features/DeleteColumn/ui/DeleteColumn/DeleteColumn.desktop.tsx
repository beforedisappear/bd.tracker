'use client';

import { Dialog } from '@/shared/ui/c';
import { DeleteColumnForm } from '../DeleteColumnForm';

import { useProjectStore, getDeleteColumnModal } from '@/entities/Project';

import {
  DELETE_COLUMN_DESCRIPTION,
  DELETE_COLUMN_TITLE,
} from '../../constants';

export function DeleteColumnDesktop() {
  const { setShowDeleteColumnModal, showDeleteColumnModal, deletingColumnId } =
    useProjectStore(getDeleteColumnModal());

  const onCloseModal = () => {
    setShowDeleteColumnModal(false);
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
      <DeleteColumnForm onClose={onCloseModal} columnId={deletingColumnId} />
    </Dialog>
  );
}
