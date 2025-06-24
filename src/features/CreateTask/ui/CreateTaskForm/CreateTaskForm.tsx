import { BasicCreateForm, Form } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useProject } from '@/shared/lib/navigation';

import {
  boardQueries,
  DEFAULT_TASK_ORDER_GAP,
  getItemWithHighestOrder,
  taskQueries,
  type Board,
} from '@/entities/Board';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/shared/config/query';
import { getErrorMessage } from '@/shared/lib/error';

import { z } from 'zod';
import { CreateTaskSchema } from '../../model/schemes';

interface Props {
  onClose: () => void;
  columnId: string | null;
}

export function CreateTaskForm(props: Props) {
  const { onClose, columnId } = props;

  const { boardId } = useProject();

  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const { mutateAsync: createTask, isPending } = useMutation(
    taskQueries.createTask(),
  );

  const onSubmit = form.handleSubmit(data => {
    if (!columnId || !boardId) return;

    const board = queryClient.getQueryData<Board>(
      boardQueries.boardById(boardId),
    );

    if (!board) throw new Error('Board not found');

    const column = board.columns.find(c => c.id === columnId);

    if (!column) throw new Error('Column not found');

    const taskWithHighestOrder = getItemWithHighestOrder(column.tasks);

    const order = taskWithHighestOrder
      ? taskWithHighestOrder.order + DEFAULT_TASK_ORDER_GAP
      : DEFAULT_TASK_ORDER_GAP;

    createTask({ ...data, columnId, boardId, order })
      .then(() => onClose())
      .catch(e => form.setError('title', { message: getErrorMessage(e) }));
  });

  return (
    <Form {...form}>
      <BasicCreateForm
        inputName='title'
        inputPlaceholder='Введите название задачи...'
        isPending={isPending}
        onSubmit={onSubmit}
      />
    </Form>
  );
}
