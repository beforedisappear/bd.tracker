import { PureCheckbox } from '@/shared/ui/c';
import { BoardTaskHeaderMenu } from '../BoardTaskHeaderMenu/BoardTaskHeaderMenu';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { cn } from '@/shared/lib/css';
import { taskQueries } from '@/entities/Board/api/queries';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';
import type { Color } from '@/entities/Board';

interface Props {
  taskId: string;
  title: string;
  isDone: boolean;
  color: Color;
  titleClassName?: string;
  offCheckTitleStyle?: boolean;
}

export function BoardTaskHeader(props: Props) {
  const {
    taskId,
    title,
    isDone,
    color,
    titleClassName,
    offCheckTitleStyle = false,
  } = props;

  const { boardId } = useProject();
  const [isChecked, setIsChecked] = useState(isDone);
  const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());

  const onSetTaskCompletion = (value: boolean) => {
    setIsChecked(value);
    updateTask({ taskId, boardId, isDone: value }).catch(e => {
      setIsChecked(isDone);
      toast.error(getErrorMessage(e));
    });
  };

  return (
    <div className='flex items-center gap-2'>
      <PureCheckbox
        checked={isChecked}
        onCheckedChange={onSetTaskCompletion}
        onClick={e => e.stopPropagation()}
      />

      <span
        className={cn(
          'font-normal text-sm line-clamp-1 cursor-pointer select-none flex-1',
          titleClassName,
          {
            'line-through text-muted-foreground opacity-50':
              isChecked && !offCheckTitleStyle,
          },
        )}
      >
        {title}
      </span>

      <BoardTaskHeaderMenu
        taskId={taskId}
        isChecked={isChecked}
        currentColor={color}
        onSetTaskCompletion={onSetTaskCompletion}
      />
    </div>
  );
}
