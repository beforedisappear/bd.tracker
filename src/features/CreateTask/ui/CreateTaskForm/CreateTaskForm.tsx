import { BasicCreateForm, Form } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { taskQueries } from '@/entities/Board';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { CreateTaskSchema } from '../../model/schemes';
import { useProject } from '@/shared/lib/navigation';

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

    createTask({ ...data, columnId, boardId }).then(() => onClose());
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
