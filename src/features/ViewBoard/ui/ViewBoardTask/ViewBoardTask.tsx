import { useSortable } from '@dnd-kit/sortable';

import { cn } from '@/shared/lib/css';
// import { CSS } from '@dnd-kit/utilities';

import { getTaskClassName } from '../../lib/getTaskClassName';
import type { Task } from '@/entities/Board';

interface Props {
  data: Task;
}

export function ViewBoardTask(props: Props) {
  const {
    data: { id, title },
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    // transform,
    // transition,
    isDragging,
  } = useSortable({ id, data: { type: 'Task', id } });

  // const style = {
  //   transform: CSS.Translate.toString(transform),
  //   transition,
  // };

  return (
    <div
      ref={setNodeRef}
      // style={style}
      {...attributes}
      {...listeners}
      className={cn(
        getTaskClassName(),
        'bg-card rounded-md p-3 shadow-sm border',
        { 'opacity-45': isDragging },
      )}
    >
      <span className='font-normal text-sm line-clamp-1'>{title}</span>
    </div>
  );
}
