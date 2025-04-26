'use client';

import { Button, Input } from '@/shared/ui/c';
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

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Input name='name' label='Название команды' />

        <Button>Создать</Button>
      </form>
    </FormProvider>
  );
}
