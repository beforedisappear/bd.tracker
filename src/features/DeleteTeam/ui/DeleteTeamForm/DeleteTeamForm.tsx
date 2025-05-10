'use client';

import { Button } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { teamQueries } from '@/entities/Team';

import { DELETE_TEAM_DESCRIPTION } from '../../constants';

interface Props {}

export function DeleteTeamForm({}: Props) {
  const { handleSubmit } = useForm();

  const { mutate: deleteTeam, isPending } = useMutation(
    teamQueries.deleteTeam(),
  );

  const onSubmit = handleSubmit(() => {
    deleteTeam({ idOrSlug: '1' });
  });

  return (
    <form onSubmit={onSubmit}>
      <p className='text-center text-muted-foreground mb-6'>
        {DELETE_TEAM_DESCRIPTION}
      </p>

      <Button
        type='submit'
        variant='destructive'
        className='w-full'
        disabled={isPending}
      >
        <span>Удалить</span>
      </Button>
    </form>
  );
}
