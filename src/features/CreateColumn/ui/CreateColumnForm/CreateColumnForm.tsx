import { Loader2 } from 'lucide-react';

import { Input, Form, Button } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useProject } from '@/shared/lib/navigation';

import { columnQueries } from '@/entities/Board';

import { z } from 'zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';
import { zodResolver } from '@hookform/resolvers/zod';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

import { CreateColumnSchema } from '../../model/schemes';

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

    createColumn({ ...data, boardId: boardId })
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .then(() => onClose())
      .catch(e => form.setError('name', { message: getErrorMessage(e) }));
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='flex flex-col gap-2 h-full'>
        <Input name='name' placeholder='Введите название колонки...' />

        <Button type='submit' className='mt-auto' disabled={isPending}>
          {isPending ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <span>Создать</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
