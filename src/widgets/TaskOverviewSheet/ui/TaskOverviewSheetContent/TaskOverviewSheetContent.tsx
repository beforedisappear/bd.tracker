import { Task, BoardSticker, BoardTaskHeader } from '@/entities/Board';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Form } from '@/shared/ui/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/shared/ui/Button/Button';
import { Badge } from '@/shared/ui/Badge/Badge';
import { MoreVerticalIcon } from 'lucide-react';

interface TaskOverviewSheetContentProps {
  task: Task;
}

interface TaskFormFields {
  description: string;
  isDone: boolean;
}

export function TaskOverviewSheetContent({
  task,
}: TaskOverviewSheetContentProps) {
  const form = useForm<TaskFormFields>({
    defaultValues: {
      description: task.description ?? '',
      isDone: task.isDone,
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit: SubmitHandler<TaskFormFields> = data => {
    // TODO: handle save
    console.log('Save:', data);
  };

  return (
    <Form {...form}>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-6 pt-4'>
          <div className='flex items-center w-full gap-3 mb-6'>
            <Checkbox
              name='isDone'
              label={task.title}
              labelClassName='text-xl font-semibold w-full'
              defaultChecked={task.isDone}
              className='flex-1 items-center'
            />

            <MoreVerticalIcon className='size-4' />
          </div>

          <div className='mb-4'>
            <div className='text-xs text-muted-foreground mb-2'>
              Автор и ответственные
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-sm'>
                <span>Автор:</span>
                <Avatar
                  key={task.assignees[0].id}
                  src=''
                  alt={task.assignees[0].name}
                  initials={task.assignees[0].name}
                  className='flex justify-center items-center h-5 w-5'
                />
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <span>Ответственные:</span>
                {task.assignees?.map(assignee => (
                  <Avatar
                    key={assignee.id}
                    src=''
                    alt={assignee.name}
                    initials={assignee.name}
                    className='flex justify-center items-center h-5 w-5'
                  />
                ))}
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <div className='text-xs text-muted-foreground mb-2'>
              Дополнительная информация
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-sm'>
                <span>Создано:</span>
                <Badge variant='outline'>
                  {format(new Date(task.createdAt), 'd MMM HH:mm', {
                    locale: ru,
                  })}
                </Badge>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <span>Обновлено:</span>
                <Badge variant='outline'>
                  {format(new Date(task.updatedAt), 'd MMM HH:mm', {
                    locale: ru,
                  })}
                </Badge>
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <div className='text-xs text-muted-foreground mb-2'>Метки</div>
            <div className='flex flex-wrap gap-2'>
              {task.stickers?.map(sticker => (
                <BoardSticker key={sticker.id} data={sticker} />
              ))}
            </div>
          </div>

          <div className='mb-4'>
            <div className='text-xs text-muted-foreground mb-2'>
              Срок исполнения
            </div>
            <div className='text-sm'>
              {task.startDate && task.endDate ? (
                <div className='flex items-center gap-2'>
                  <Badge variant='outline'>
                    {format(new Date(task.startDate), 'd MMM yyyy', {
                      locale: ru,
                    })}{' '}
                    -{' '}
                    {format(new Date(task.endDate), 'd MMM yyyy', {
                      locale: ru,
                    })}
                  </Badge>
                </div>
              ) : (
                <Badge variant='outline'>Не указано</Badge>
              )}
            </div>
          </div>

          <div className='mb-4'>
            <div className='text-xs text-muted-foreground mb-2'>Описание</div>
            <textarea
              {...register('description')}
              rows={6}
              className=' resize-none w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors 
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]'
              placeholder='Введите описание...'
            />
          </div>

          <div className='flex justify-end'>
            <Button type='submit'>Сохранить</Button>
          </div>
        </div>
      </form> */}
      <div>
        <BoardTaskHeader
          taskId={task.id}
          title={task.title}
          isDone={task.isDone}
          color={task.color}
          titleClassName='text-xl font-semibold'
          offCheckTitleStyle
        />
      </div>
    </Form>
  );
}
