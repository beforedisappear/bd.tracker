import { useSortable } from '@dnd-kit/sortable';
import { useRouter } from 'next/navigation';

import { getTaskClassName } from '../../lib/getTaskClassName';
import { cn } from '@/shared/lib/css';

interface Props {
  id: string;
  children: React.ReactNode;
}

export function ViewBoardTaskWrapper(props: Props) {
  const { id, children } = props;

  const { push } = useRouter();
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id,
    data: { type: 'Task', id },
  });

  const handleClick = () => {
    push(`?task=${id}`, { scroll: false });
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
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
