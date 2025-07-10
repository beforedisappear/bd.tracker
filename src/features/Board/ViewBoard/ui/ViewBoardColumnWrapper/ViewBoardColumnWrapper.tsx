import { useSortable } from '@dnd-kit/sortable';

import { cn } from '@/shared/lib/css';
import { getColumnClassName } from '../../lib/getColumnClassName';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  id: string;
  children: React.ReactNode;
}

export function ViewBoardColumnWrapper(props: Props) {
  const { id, children } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id, data: { type: 'Column', id } });

  const dragListeners = listeners;

  if (dragListeners && dragListeners.onPointerDown) {
    const { onPointerDown } = dragListeners;

    dragListeners.onPointerDown = (event: PointerEvent) => {
      const { target } = event;

      if (
        target &&
        target instanceof HTMLElement &&
        target.dataset.drag === 'false'
      ) {
        return;
      }

      onPointerDown(event);
    };
  }

  return (
    <div
      className={cn(getColumnClassName(), { 'opacity-45': isDragging })}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...attributes}
      {...dragListeners}
    >
      {children}
    </div>
  );
}
