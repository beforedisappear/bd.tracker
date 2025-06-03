import { ProjectView } from '@/widgets/ProjectView';
import { TaskFilters } from '@/widgets/TaskFilters';

import { DeleteBoard } from '@/features/DeleteBoard';
import { SelectProjectView } from '@/features/SelectProjectView';
import { ManageProjectMembers } from '@/features/ManageProjectMembers';

import { ProjectStoreProvider } from '@/entities/Project';
interface Props {}

export function ProjectByIdPage({}: Props) {
  return (
    <ProjectStoreProvider>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex w-full gap-4 h-8'>
          <SelectProjectView />
          <TaskFilters />
        </div>

        <ProjectView />
      </div>

      <ManageProjectMembers />
      <DeleteBoard />
    </ProjectStoreProvider>
  );
}
