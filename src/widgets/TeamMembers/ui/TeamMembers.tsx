import { Card } from '@/shared/ui/s';
import { InviteToTeam2 } from '@/features/Team/InviteToTeam';
import { ViewTeamMembers } from '@/features/Team/ViewTeamMembers';

interface Props {}

export function TeamMembers({}: Props) {
  return (
    <Card
      title='Участники команды'
      titleClassName='text-xl font-bold 
      md:text-base'
      contentClassName='flex flex-col gap-4'
    >
      <InviteToTeam2 />

      <ViewTeamMembers />
    </Card>
  );
}
