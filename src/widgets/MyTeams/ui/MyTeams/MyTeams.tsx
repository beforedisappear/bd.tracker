'use client';

import { Card } from '@/shared/ui/s';
import { SelectTeamAdvanced } from '@/features/Team/SelectTeam';
import { CreateTeam } from '@/features/Team/CreateTeam';
import { DeleteTeam } from '@/features/Team/DeleteTeam';

export function MyTeams() {
  return (
    <Card
      title='Команды'
      titleClassName='text-xl font-bold'
      contentClassName='flex flex-col gap-4'
    >
      <SelectTeamAdvanced />
      <CreateTeam />
      <DeleteTeam hideTrigger />
    </Card>
  );
}
