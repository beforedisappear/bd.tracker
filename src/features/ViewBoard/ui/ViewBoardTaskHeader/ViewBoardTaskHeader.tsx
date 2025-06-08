import { PureCheckbox } from '@/shared/ui/c';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { cn } from '@/shared/lib/css';
import { taskQueries } from '@/entities/Board/api/queries';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';
import { ViewBoardTaskMenu } from '../ViewBoardTaskMenu/ViewBoardTaskMenu';

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
        checked={isChecked}
        onCheckedChange={handleChange}
        onClick={e => e.stopPropagation()}
      />

      <span
        className={cn(
          'font-normal text-sm line-clamp-1 cursor-pointer select-none flex-1',
          { 'line-through text-muted-foreground opacity-50': isChecked },
        )}
      >
        {title}
      </span>

      <ViewBoardTaskMenu />
    </div>
  );
}
