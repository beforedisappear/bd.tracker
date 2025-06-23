import { BasicCreateForm, Form } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useProject } from '@/shared/lib/navigation';

import {
  boardQueries,
  columnQueries,
  DEFAULT_COLUMN_ORDER_GAP,
  getItemWithHighestOrder,
  type Board,
} from '@/entities/Board';

import { z } from 'zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';
import { zodResolver } from '@hookform/resolvers/zod';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

import { CreateColumnSchema } from '../../model/schemes';
import { queryClient } from '@/shared/config/query';

interface Props {
  onClose: () => void;
}

export function CreateColumnForm(props: Props) {
  const { onClose } = props;

  const { boardId } = useProject();

  const form = useForm<z.infer<typeof CreateColumnSchema>>({
    resolver: zodResolver(CreateColumnSchema),
  });

  const { mutateAsync: createColumn, isPending } = useMutation(
    columnQueries.createColumn(),
  );

  const onSubmit = form.handleSubmit(data => {
    if (!boardId) return;

    const board = queryClient.getQueryData<Board>(
      boardQueries.boardById(boardId),
    );

    if (!board?.columns) return;

    const columnWithHighestOrder = getItemWithHighestOrder(board.columns);

    createColumn({
      ...data,
      boardId: boardId,
      order: columnWithHighestOrder.order + DEFAULT_COLUMN_ORDER_GAP,
    })
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .then(() => onClose())
      .catch(e => form.setError('name', { message: getErrorMessage(e) }));
  });

  return (
    <Form {...form}>
      <BasicCreateForm
        inputName='name'
        onSubmit={onSubmit}
        isPending={isPending}
        inputPlaceholder='Введите название колонки...'
      />
    </Form>
  );
}
