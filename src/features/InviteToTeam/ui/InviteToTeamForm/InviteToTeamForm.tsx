import { cn } from '@/shared/lib/css';
import { Loader2 } from 'lucide-react';

import { Button, Form, Input, Checkbox } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { teamQueries, InviteToTeamSchema } from '@/entities/Team';
import { getErrorMessage } from '@/shared/lib/error';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { type Project } from '@/entities/Project';
import { toast } from 'sonner';
interface Props {
  projects: Project[];
  onClose?: () => void;
  className?: string;
  submitButtonClassName?: string;
}

//TODO: Добавить проверку на существование приглашения и уведомить об этом
export function InviteToTeamForm(props: Props) {
  const { projects, onClose, className, submitButtonClassName } = props;

  const { tenant } = useParams<{ tenant: string }>()!;

  const form = useForm<z.infer<typeof InviteToTeamSchema>>({
    resolver: zodResolver(InviteToTeamSchema),
  });

  const { mutateAsync: inviteToTeam, isPending } = useMutation(
    teamQueries.inviteToTeam(),
  );

  const onSubmit = form.handleSubmit(data => {
    const dto = {
      teamIdOrSlug: tenant,
      ...data,
    };

    inviteToTeam(dto)
      .then(() => form.reset())
      .then(() => toast.success('Пользователь успешно приглашён'))
      .catch(e =>
        form.setError('inviteeEmail', { message: getErrorMessage(e) }),
      );
  });

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6 h-full', className)}
        onSubmit={onSubmit}
      >
        <Input name='inviteeEmail' label='E-mail адрес' />

        <div className='flex flex-col gap-2'>
          <span className='font-medium mb-1'>Также пригласить в проекты:</span>

          <div className='flex flex-col gap-1 pl-2'>
            {projects.map(project => (
              <Checkbox
                key={project.id}
                name={`projectIds.${project.id}`}
                className='h-6 items-center'
                labelClassName='font-normal text-base'
                label={project.name}
              />
            ))}
          </div>
        </div>

        <div className='flex justify-end gap-2 mt-auto'>
          {onClose && (
            <Button variant='outline' type='button' onClick={onClose}>
              Отмена
            </Button>
          )}

          <Button
            type='submit'
            className={cn('min-w-48', submitButtonClassName)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <span>Пригласить сотрудника</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
