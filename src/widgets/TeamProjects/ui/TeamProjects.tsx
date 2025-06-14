import { Card } from '@/shared/ui/s';
import { CreateProject } from '@/features/CreateProject';
import { ManageProjects } from '@/features/ManageProjects';

interface Props {
  className?: string;
}

export function TeamProjects({}: Props) {
  return (
    <Card
      title='Проекты команды'
      titleClassName='text-xl font-bold 
      md:text-base'
      className='flex flex-col'
      contentClassName='flex flex-col gap-4'
    >
      <CreateProject />
      <ManageProjects />
      {/* TODO add */}
      {/* DeleteProject */}
      {/* ManageProjectMembers */}
    </Card>
  );
}
