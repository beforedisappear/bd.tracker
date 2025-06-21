import { PlusCircle } from 'lucide-react';

import { Button } from '@/shared/ui/c';
import { useBoardStore, getCreateTaskModal } from '@/entities/Board';

interface Props {
  columnId: string;
}

export function ViewBoardColumnCreateTaskBtn(props: Props) {
  const { columnId } = props;

  const { setShowCreateTaskModal, setCurrentColumnId } =
    useBoardStore(getCreateTaskModal());

  const onOpenCreateTaskModal = () => {
    setShowCreateTaskModal(true);
    setCurrentColumnId(columnId);
  };

  return (
    <Button
      variant={null}
      className='mt-3 w-full justify-start text-muted-foreground'
      onClick={onOpenCreateTaskModal}
    >
      <PlusCircle className='mr-2 h-4 w-4' />
      <span>Добавить задачу</span>
    </Button>
  );
}
