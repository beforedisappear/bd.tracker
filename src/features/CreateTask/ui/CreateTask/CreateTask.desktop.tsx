import { Dialog } from '@/shared/ui/c';
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';

import { useCallback } from 'react';
import { useBoardStore, getCreateTaskModal } from '@/entities/Board';

import { CREATE_TASK_TITLE } from '../../constants';

export function CreateTaskDesktop() {
  const {
    showCreateTaskModal,
    setShowCreateTaskModal,
    currentColumnId,
    setCurrentColumnId,
  } = useBoardStore(getCreateTaskModal());

  const onClose = useCallback(() => {
    setShowCreateTaskModal(false);
    setCurrentColumnId(null);
  }, [setShowCreateTaskModal, setCurrentColumnId]);

  return (
    <Dialog
      title={CREATE_TASK_TITLE}
      descClassName='text-left'
      className='h-48 max-w-96'
      open={showCreateTaskModal}
      onOpenChange={setShowCreateTaskModal}
    >
      <CreateTaskForm onClose={onClose} columnId={currentColumnId} />
    </Dialog>
  );
}
