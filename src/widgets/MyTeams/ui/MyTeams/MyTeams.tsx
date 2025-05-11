'use client';

import { Card } from '@/shared/ui/s';
import { SelectTeamAdvanced } from '@/features/SelectTeam';
import { CreateTeam } from '@/features/CreateTeam';
import { DeleteTeam } from '@/features/DeleteTeam';

import { useTeamStore } from '@/entities/Team';
import { useCallback } from 'react';

export function MyTeams() {
  const setDeletingTeam = useTeamStore(state => state.setDeletingTeam);
  const setShowDeleteTeamModal = useTeamStore(
    state => state.setShowDeleteTeamModal,
  );

  const onDeleteTeam = useCallback((id: string, slug: string) => {
    setDeletingTeam({ id, slug });
    setShowDeleteTeamModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title='Команды'
      titleClassName='text-xl font-bold'
      contentClassName='flex flex-col gap-4'
    >
      <SelectTeamAdvanced onDeleteTeam={onDeleteTeam} />
      <CreateTeam />
      <DeleteTeam hideTrigger />
    </Card>
  );
}
