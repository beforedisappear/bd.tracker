import { cn } from '@/shared/lib/css';

import { Button, Input } from '@/shared/ui/c';

import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getTeamRoutePath } from '@/shared/config/routes';
import { teamQueries } from '@/entities/Team';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { CREATE_TEAM_DESCRIPTION } from '../../constants';
import {
  SENDING_DATA_MESSAGE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '@/shared/constants';

import { CreateTeamSchema } from '../../model/schemes';
import type { CreateTeam } from '../../model/types';

interface Props {
  className?: string;
}

export function CreateTeamForm(props: Props) {
  const { className } = props;

  const { push } = useRouter();

  const form = useForm<CreateTeam>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: { name: '' },
  });

  const { mutateAsync: createTeam } = useMutation(teamQueries.createTeam());

  const onSubmit = form.handleSubmit(data => {
    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    createTeam(data)
      .then(({ data }) => push(getTeamRoutePath(data.slug)))
      .then(() => toast.success(SUCCESS_MESSAGE, { id: toastId }))
      .catch(() => toast.error(ERROR_MESSAGE, { id: toastId }));
  });
  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className={cn('flex flex-col gap-2 h-full', className)}
      >
        <p className='text-center text-sm text-zinc-500'>
          {CREATE_TEAM_DESCRIPTION}
        </p>

        <Input name='name' label='Название команды' autoComplete='off' />

        <Button className='mt-auto' type='submit'>
          Создать
        </Button>
      </form>
    </FormProvider>
  );
}
