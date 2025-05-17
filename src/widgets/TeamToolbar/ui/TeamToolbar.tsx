'use client';

import { Card } from '@/shared/ui/s';
import { EditTeamName } from '@/features/EditTeamName';
import { InviteToTeam } from '@/features/InviteToTeam';
interface Props {}

export function TeamToolbar({}: Props) {
  return (
    <Card contentClassName='flex flex-col gap-4'>
      <EditTeamName />
      <InviteToTeam />
    </Card>
  );
}
