'use client';

import { Drawer } from '@/shared/ui/c';
import { DeleteColumnForm } from '../DeleteColumnForm';

import { useProjectStore, getDeleteColumnModal } from '@/entities/Project';

import {
  DELETE_COLUMN_DESCRIPTION,
  DELETE_COLUMN_TITLE,
} from '../../constants';

export function DeleteColumnMobile() {
  const { setShowDeleteColumnModal, showDeleteColumnModal, deletingColumnId } =
    useProjectStore(getDeleteColumnModal());

  const onCloseModal = () => {
    setShowDeleteColumnModal(false);
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
      <DeleteColumnForm onClose={onCloseModal} columnId={deletingColumnId} />
    </Drawer>
  );
}
