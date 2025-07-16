import {
  PureCheckbox,
  RenameInput,
  type RenameInputMethods,
} from '@/shared/ui/c';
import { BoardTaskHeaderMenu } from '../BoardTaskHeaderMenu/BoardTaskHeaderMenu';

import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { cn } from '@/shared/lib/css';
import { taskQueries } from '@/entities/Board/api/queries';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

import { RenameTaskSchema } from '@/entities/Board';

import type { Color } from '@/entities/Board';

interface Props {
  taskId: string;
  title: string;
  isDone: boolean;
  color: Color;
  titleClassName?: string;
  offCheckTitleStyle?: boolean;
  fullTitle?: boolean;
  onClose: () => void;
}

export function BoardTaskHeader(props: Props) {
  const {
    taskId,
    title,
    isDone,
    color,
    titleClassName,
    offCheckTitleStyle = false,
    fullTitle = false,
    onClose,
  } = props;

  const { boardId } = useProject();
  const [isChecked, setIsChecked] = useState(isDone);
  const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());
  const methodsRef = useRef<RenameInputMethods>(null);

  const onSetTaskCompletion = (value: boolean) => {
    setIsChecked(value);
    updateTask({ taskId, boardId, isDone: value }).catch(e => {
      setIsChecked(isDone);
      toast.error(getErrorMessage(e));
    });
  };

  const onRename = (name: string) => {
    updateTask({ taskId, boardId, title: name }).catch(e => {
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

      <RenameInput
        key={`${taskId}-${title}`}
        className={cn(
          'font-normal text-sm line-clamp-1 cursor-pointer select-none flex-1',
          titleClassName,
          {
            'line-through text-muted-foreground opacity-50':
              isChecked && !offCheckTitleStyle,
            'line-clamp-none text-wrap break-all': fullTitle,
          },
        )}
        initialName={title}
        schema={RenameTaskSchema}
        methodsRef={methodsRef}
        onRename={onRename}
      />

      <BoardTaskHeaderMenu
        taskId={taskId}
        isChecked={isChecked}
        currentColor={color}
        onSetTaskCompletion={onSetTaskCompletion}
        onRenameTask={() => methodsRef.current?.onStartEditing?.()}
        onClose={onClose}
      />
    </div>
  );
}
