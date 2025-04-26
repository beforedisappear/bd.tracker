'use client';

import { Button, Dialog, Input } from '@/shared/ui/c';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { teamQueries } from '@/entities/Team';
import { getTeamRoutePath } from '@/shared/config/routes';

import {
  ERROR_MESSAGE,
  SENDING_DATA_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/shared/constants';

import { CreateTeamSchema } from '../../model/schemes';
import type { CreateTeam } from '../../model/types';
import { CREATE_TEAM_DESCRIPTION } from '../../constants';

interface Props {}

export function CreateTeam({}: Props) {
  const { push } = useRouter();

  const form = useForm<CreateTeam>({ resolver: zodResolver(CreateTeamSchema) });

  const { mutateAsync: createTeam } = useMutation(teamQueries.createTeam());

  const onSubmit = form.handleSubmit(data => {
    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    createTeam(data)
      .then(({ data }) => {
        toast.success(SUCCESS_MESSAGE, { id: toastId });
        push(getTeamRoutePath(data.slug));
      })
      .catch(() => toast.error(ERROR_MESSAGE, { id: toastId }));
  });

  const trigger = (
    <Button variant={null} className='mx-auto mt-2 w-fit'>
      Создать команду
    </Button>
  );

  return (
    <Dialog
      title='Создать команду'
      titleClassName='text-center'
      trigger={trigger}
      className='h-80 max-w-96'
    >
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className='flex flex-col gap-2 h-full'>
          <p className='text-center text-sm text-zinc-500'>
            {CREATE_TEAM_DESCRIPTION}
          </p>

          <Input name='name' label='Название команды' autoComplete='off' />

          <Button className='mt-auto'>Создать</Button>
        </form>
      </FormProvider>
    </Dialog>
  );
}
