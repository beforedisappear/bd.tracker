import { PencilIcon, TrashIcon, CheckCircle2Icon } from 'lucide-react';

import { BoardTaskHeaderMenuItemColors } from '../BoardTaskHeaderMenuItemColors/BoardTaskHeaderMenuItemColors';
import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { BoardTaskHeaderMenuTrigger } from '../BoardTaskHeaderMenuTrigger/BoardTaskHeaderMenuTrigger';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { taskQueries } from '@/entities/Board/api/queries';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/css';
import type { MouseEvent } from 'react';
import type { Color } from '@/entities/Board';

interface Props {
  taskId: string;
  isChecked: boolean;
  currentColor: Color;
  onSetTaskCompletion: (value: boolean) => void;
  onClose: () => void;
  onRenameTask: () => void;
}

export function BoardTaskHeaderMenu(props: Props) {
  const {
    taskId,
    isChecked,
    currentColor,
    onSetTaskCompletion,
    onClose,
    onRenameTask,
  } = props;

  const { boardId } = useProject();
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteTask } = useMutation(taskQueries.deleteTask());
  const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());

  const onSelectColor = (e: MouseEvent<HTMLButtonElement>, color: Color) => {
    e.stopPropagation();
    setIsOpen(false);

    if (color === currentColor) return;

    updateTask({ taskId, boardId, color }).catch(e => {
      toast.error(getErrorMessage(e));
    });
  };

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: {
        text: isChecked ? 'Выполнена' : 'Отметить выполненной',
        icon: (
          <CheckCircle2Icon
            className={cn('size-4', { ['text-green-500']: isChecked })}
          />
        ),
      },
      onSelect: e => {
        e.stopPropagation();
        onSetTaskCompletion(!isChecked);
      },
    },
    {
      type: 'item',
      label: {
        text: 'Переименовать',
        icon: <PencilIcon className='size-4' />,
      },
      onSelect: e => {
        e.stopPropagation();
        onRenameTask();
      },
    },
    {
      type: 'separator',
    },
    {
      type: 'pure',
      content: (
        <BoardTaskHeaderMenuItemColors
          currentColor={currentColor}
          onSelect={onSelectColor}
        />
      ),
    },
    {
      type: 'separator',
    },
    {
      type: 'item',
      label: {
        text: 'Удалить',
        icon: <TrashIcon className='size-4' />,
      },
      onSelect: e => {
        e.stopPropagation();
        setIsOpen(false);

        deleteTask({ taskId, boardId })
          .then(() => onClose?.())
          .catch(e => toast.error(getErrorMessage(e)));
      },
    },
  ];

  return (
    <DropdownMenu
      options={options}
      trigger={<BoardTaskHeaderMenuTrigger />}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
