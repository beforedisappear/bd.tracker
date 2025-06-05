import { BasicCreateForm, Form } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { taskQueries } from '@/entities/Board';

import { z } from 'zod';
import { CreateTaskSchema } from '../../model/schemes';

interface Props {
  onClose: () => void;
}

export function CreateTaskForm(props: Props) {
  const { onClose } = props;

  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const { mutateAsync: createTask, isPending } = useMutation(
    taskQueries.createTask(),
  );

  const onSubmit = form.handleSubmit(data => {
    console.log(data);
    createTask({ ...data, columnId: '' }).then(() => onClose());
  });

  return (
    <Form {...form}>
      <BasicCreateForm
        inputName='name'
        inputPlaceholder='Введите название задачи...'
        isPending={isPending}
        onSubmit={onSubmit}
      />
    </Form>
  );
}
