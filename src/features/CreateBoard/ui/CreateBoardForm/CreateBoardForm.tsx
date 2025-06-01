import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/css';

import { Button, Input } from '@/shared/ui/c';

import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { boardQueries } from '@/entities/Board';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@/shared/lib/error';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

import { z } from 'zod';
import { CreateBoardSchema } from '../../model/schemes';

interface Props {
  className?: string;
  onClose?: () => void;
}

export function CreateBoardForm(props: Props) {
  const { className, onClose } = props;

  const { projectId } = useProject();

  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: { name: '' },
  });

  const { mutateAsync: createBoard, isPending } = useMutation(
    boardQueries.createBoard(),
  );

  const onSubmit = form.handleSubmit(data => {
    createBoard({ ...data, projectId })
      .then(() => onClose?.())
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .catch(e => form.setError('name', { message: getErrorMessage(e) }));
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className={cn('flex flex-col gap-2 h-full', className)}
      >
        <Input
          name='name'
          label='Название доски'
          autoComplete='off'
          disabled={isPending}
        />

        <Button className='mt-auto' type='submit' disabled={isPending}>
          {isPending ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <span>Создать</span>
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
