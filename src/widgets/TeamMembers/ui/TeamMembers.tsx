import { Card } from '@/shared/ui/s';
import { InviteToTeam2 } from '@/features/InviteToTeam';
import { ViewTeamMembers } from '@/features/ViewTeamMembers';

interface Props {}

export function TeamMembers({}: Props) {
  return (
    <Card
      title='Участники команды'
      titleClassName='text-xl font-bold'
      contentClassName='flex flex-col gap-4'
    >
      <InviteToTeam2 />

      <ViewTeamMembers />
    </Card>
  );
}
