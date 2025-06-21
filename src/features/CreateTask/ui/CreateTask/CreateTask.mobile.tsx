import { Drawer } from '@/shared/ui/c';
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';

import { useCallback } from 'react';
import { useBoardStore, getCreateTaskModal } from '@/entities/Board';

import { CREATE_TASK_TITLE } from '../../constants';

export function CreateTaskMobile() {
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
    <Drawer
      title={CREATE_TASK_TITLE}
      titleClassName='text-center'
      open={showCreateTaskModal}
      onOpenChange={setShowCreateTaskModal}
      className='h-[250px]'
    >
      <CreateTaskForm onClose={onClose} columnId={currentColumnId} />
    </Drawer>
  );
}
