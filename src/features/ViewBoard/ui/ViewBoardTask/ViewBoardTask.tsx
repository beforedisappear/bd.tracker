import type { Task } from '@/entities/Board';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  data: Task;
}

export function ViewBoardTask(props: Props) {
  const {
    data: { id, title },
  } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type: 'Task', id } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex flex-col min-h-24 h-auto gap-2 bg-card rounded-md p-3 shadow-sm border`}
    >
      <span className='font-normal text-sm line-clamp-1'>{title}</span>
    </div>
  );
}
