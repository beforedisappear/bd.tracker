import { Loader2 } from 'lucide-react';

import { Button, Form } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';
import { useState } from 'react';

import { toast } from 'sonner';
import { taskQueries, type Task } from '@/entities/Board';

interface Props {
  taskId: Task['id'];
  description: Task['description'];
}

export function TaskOverviewSheetDescription(props: Props) {
  const { description, taskId } = props;
  const [isEditing, setIsEditing] = useState(false);

  const { boardId } = useProject();

  const { mutateAsync: updateTask, isPending } = useMutation(
    taskQueries.updateTask(),
  );

  const form = useForm({
    defaultValues: { description },
  });

  const handleSubmit = form.handleSubmit(data => {
    updateTask({
      boardId: boardId,
      taskId: taskId,
      ...data,
    })
      .then(() => setIsEditing(false))
      .catch(e => toast.error(e.message));
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset({ description });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-muted-foreground'>Описание</div>
          {!isEditing && (
            <Button
              type='button'
              variant={null}
              size='sm'
              onClick={handleEdit}
              className='text-xs h-auto'
            >
              Редактировать
            </Button>
          )}
        </div>

        <textarea
          {...form.register('description')}
          rows={6}
          disabled={!isEditing}
          className='resize-none w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors 
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
          disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Введите описание...'
        />

        {isEditing && (
          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleCancel}
            >
              Отмена
            </Button>
            <Button
              type='submit'
              size='sm'
              className='min-w-24'
              disabled={!form.formState.isDirty || isPending}
            >
              {isPending ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <span>Сохранить</span>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
