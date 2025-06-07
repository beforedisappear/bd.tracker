import { PureCheckbox } from '@/shared/ui/c';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { cn } from '@/shared/lib/css';
import { taskQueries } from '@/entities/Board/api/queries';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

interface Props {
  taskId: string;
  title: string;
  isDone: boolean;
}

export function ViewBoardTaskHeader(props: Props) {
  const { taskId, title, isDone } = props;

  const [isChecked, setIsChecked] = useState(isDone);

  const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());

  const handleChange = (value: boolean) => {
    setIsChecked(value);
    updateTask({ taskId, isDone: value }).catch(e => {
      setIsChecked(isDone);
      toast.error(getErrorMessage(e));
    });
  };

  return (
    <div className='flex items-center gap-2'>
      <PureCheckbox
        id={`task-${taskId}`}
        checked={isChecked}
        onCheckedChange={handleChange}
      />
      <label
        htmlFor={`task-${taskId}`}
        className={cn('font-normal text-sm line-clamp-1 cursor-pointer', {
          'line-through text-muted-foreground': isChecked,
        })}
      >
        {title}
      </label>
    </div>
  );
}
