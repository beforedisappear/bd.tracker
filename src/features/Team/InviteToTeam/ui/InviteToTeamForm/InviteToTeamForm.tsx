import { cn } from '@/shared/lib/css';
import { Loader2 } from 'lucide-react';

import { Button, Form, Input, Checkbox, ScrollArea } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { teamQueries, InviteToTeamSchema } from '@/entities/Team';
import { getErrorMessage } from '@/shared/lib/error';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import type { Project } from '@/entities/Project';
import { useDebounce } from '@/shared/lib/ui';

interface Props {
  projects: Project[];
  onClose?: () => void;
}

export function InviteToTeamForm(props: Props) {
  const { projects, onClose } = props;

  const { isMobile, isDesktop } = useDeviceType();
  const tenant = useTenant();

  const form = useForm<z.infer<typeof InviteToTeamSchema>>({
    resolver: zodResolver(InviteToTeamSchema),
  });

  const { mutateAsync: inviteToTeam, isPending } = useMutation(
    teamQueries.inviteToTeam(),
  );

  const { mutateAsync: checkTeamInvitation } = useMutation(
    teamQueries.checkTeamInvitation(),
  );

  const unwrappedCheckTeamInvitation = async (
    dto: Parameters<typeof checkTeamInvitation>[0],
  ) => {
    return checkTeamInvitation(dto)
      .then(res => {
        if (!res.exists) return;

        toast.warning('Пользователь уже имеет действующее приглашение');
      })
      .catch(e => toast.error(getErrorMessage(e)));
  };

  const debouncedCheckTeamInvitation = useDebounce(
    unwrappedCheckTeamInvitation,
    500,
  );

  const onSubmit = form.handleSubmit(data => {
    const dto = {
      ...data,
      teamIdOrSlug: tenant,
      projectIds: data.projectIds
        ? Object.keys(data.projectIds).filter(key => data.projectIds?.[key])
        : [],
    };

    inviteToTeam(dto)
      .then(({ data }) => {
        const message =
          data.result === 'notification'
            ? 'Пользователь успешно приглашён в команду'
            : 'Приглашение отправлено на указанный email';

        toast.success(message);
      })
      .then(() => form.reset())
      .catch(e =>
        form.setError('inviteeEmail', { message: getErrorMessage(e) }),
      );
  });

  const onSetAll = (checked: boolean) => {
    const values = Object.fromEntries(
      projects.map(project => [project.id, checked]),
    );

    form.setValue('projectIds', values);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = InviteToTeamSchema.safeParse({
      inviteeEmail: e.target.value,
    });

    if (!value.success) return;

    debouncedCheckTeamInvitation({
      idOrSlug: tenant,
      inviteeEmail: e.target.value,
    });
  };

  return (
    <Form {...form}>
      <form className='flex flex-col gap-6 h-full' onSubmit={onSubmit}>
        <Input
          name='inviteeEmail'
          label='E-mail адрес'
          onChange={handleChangeEmail}
        />

        {projects.length > 0 && (
          <div className='flex flex-col gap-2'>
            <span className='font-medium mb-1'>
              Также пригласить в проекты:
            </span>

            <ScrollArea
              type='always'
              className={cn('flex flex-col gap-1 pr-4 mr-[-1rem]', {
                'h-36': isDesktop,
                'h-full max-h-[400px]': isMobile,
              })}
            >
              <Checkbox
                name='all'
                label='Все проекты'
                className='h-6 items-center'
                labelClassName='font-normal text-base'
                onCheckedChange={onSetAll}
              />

              <div className='border-b-2 border-y-primary/50 my-1 rounded-full' />

              {projects.map(project => (
                <Checkbox
                  key={project.id}
                  name={`projectIds.${project.id}`}
                  className='h-6 items-center'
                  labelClassName='font-normal text-base'
                  label={project.name}
                />
              ))}
            </ScrollArea>
          </div>
        )}

        <div className='flex justify-end gap-2 mt-auto'>
          {onClose && (
            <Button variant='outline' type='button' onClick={onClose}>
              Отмена
            </Button>
          )}

          <Button
            type='submit'
            className={cn('min-w-48', { 'w-full': isMobile })}
            disabled={isPending || !form.formState.isValid}
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
