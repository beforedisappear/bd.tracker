'use client';

import { Drawer } from '@/shared/ui/c';
import { DeleteColumnForm } from '../DeleteColumnForm';

import { useBoardStore, getDeleteColumnModal } from '@/entities/Board';

import {
  DELETE_COLUMN_DESCRIPTION,
  DELETE_COLUMN_TITLE,
} from '../../constants';

export function DeleteColumnMobile() {
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
    <Drawer
      title={DELETE_COLUMN_TITLE}
      titleClassName='text-center'
      description={DELETE_COLUMN_DESCRIPTION}
      descClassName='text-center'
      className='h-[250px]'
      open={showDeleteColumnModal}
      onOpenChange={setShowDeleteColumnModal}
    >
      <DeleteColumnForm onClose={onCloseModal} columnId={currentColumnId} />
    </Drawer>
  );
}
