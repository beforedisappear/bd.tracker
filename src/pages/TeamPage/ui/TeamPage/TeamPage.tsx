import { TeamToolbar } from '@/widgets/TeamToolbar';
import { TeamProjects } from '@/widgets/TeamProjects';
import { TeamMembers } from '@/widgets/TeamMembers';

interface Props {}

export function TeamPage({}: Props) {
  return (
    <div className='flex flex-col gap-4 w-full max-w-2xl'>
      <TeamToolbar />
      <TeamProjects />
      <TeamMembers />
    </div>
  );
}
