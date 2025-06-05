import { Dialog } from '@/shared/ui/c';
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';

import { useCallback } from 'react';
import { useProjectStore, getCreateTaskModal } from '@/entities/Project';

import { CREATE_TASK_TITLE } from '../../constants';

export function CreateTaskDesktop() {
  const { showCreateTaskModal, setShowCreateTaskModal } =
    useProjectStore(getCreateTaskModal());

  const onClose = useCallback(() => {
    setShowCreateTaskModal(false);
  }, [setShowCreateTaskModal]);

  return (
    <Dialog
      title={CREATE_TASK_TITLE}
      descClassName='text-left'
      className='h-48 max-w-96'
      open={showCreateTaskModal}
      onOpenChange={setShowCreateTaskModal}
    >
      <CreateTaskForm onClose={onClose} />
    </Dialog>
  );
}
