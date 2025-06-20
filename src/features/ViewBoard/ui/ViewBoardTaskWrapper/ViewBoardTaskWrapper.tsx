import { useSortable } from '@dnd-kit/sortable';
import { useRouter } from 'next/navigation';

import { getTaskClassName } from '../../lib/getTaskClassName';
import { getTaskParams } from '@/shared/config/routes';
import { cn } from '@/shared/lib/css';
import type { Color } from '@/entities/Board';

interface Props {
  id: string;
  color: Color;
  children: React.ReactNode;
  isFiltered?: boolean;
}

export function ViewBoardTaskWrapper(props: Props) {
  const { id, color, children } = props;

  const { push } = useRouter();
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id,
    data: { type: 'Task', id },
  });

  const handleClick = () => {
    push(getTaskParams(id), { scroll: false });
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={cn(
        getTaskClassName(color),
        'rounded-md p-3 shadow-sm border',
        { 'opacity-45': isDragging },
      )}
    >
      {children}
    </div>
  );
}
