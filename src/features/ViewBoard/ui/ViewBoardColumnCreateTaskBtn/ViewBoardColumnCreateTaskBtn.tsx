import { PlusCircle } from 'lucide-react';

import { Button } from '@/shared/ui/c';
import { useProjectStore, getCreateTaskModal } from '@/entities/Project';

export function ViewBoardColumnCreateTaskBtn() {
  const { setShowCreateTaskModal } = useProjectStore(getCreateTaskModal());

  return (
    <Button
      variant={null}
      className='mt-3 w-full justify-start text-muted-foreground'
      onClick={() => setShowCreateTaskModal(true)}
    >
      <PlusCircle className='mr-2 h-4 w-4' />
      <span>Добавить задачу</span>
    </Button>
  );
}
