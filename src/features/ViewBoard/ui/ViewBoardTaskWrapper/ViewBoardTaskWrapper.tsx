import { useSortable } from '@dnd-kit/sortable';

import { getTaskClassName } from '../../lib/getTaskClassName';
import { cn } from '@/shared/lib/css';

interface Props {
  id: string;
  children: React.ReactNode;
}

export function ViewBoardTaskWrapper(props: Props) {
  const { id, children } = props;

  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id,
    data: { type: 'Task', id },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        getTaskClassName(),
        'bg-card rounded-md p-3 shadow-sm border',
        { 'opacity-45': isDragging },
      )}
    >
      {children}
    </div>
  );
}
