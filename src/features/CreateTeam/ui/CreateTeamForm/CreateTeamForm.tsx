import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/css';

import { Button, Input } from '@/shared/ui/c';

import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getTeamRoutePath } from '@/shared/config/routes';
import { teamQueries } from '@/entities/Team';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@/shared/lib/error';

import { CREATE_TEAM_DESCRIPTION } from '../../constants';
import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

import { CreateTeamSchema } from '../../model/schemes';
import type { CreateTeamDtoReq } from '../../model/types';

interface Props {
  className?: string;
}

export function CreateTeamForm(props: Props) {
  const { className } = props;

  const { push } = useRouter();

  const form = useForm<CreateTeamDtoReq>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: { name: '' },
  });

  const { mutateAsync: createTeam, isPending } = useMutation(
    teamQueries.createTeam(),
  );

  const onSubmit = form.handleSubmit(data => {
    createTeam(data)
      .then(({ data }) => push(getTeamRoutePath(data.slug)))
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .catch(e => form.setError('name', { message: getErrorMessage(e) }));
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className={cn('flex flex-col gap-2 h-full', className)}
      >
        <p className='text-center text-sm text-muted-foreground'>
          {CREATE_TEAM_DESCRIPTION}
        </p>

        <Input
          name='name'
          label='Название команды'
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
