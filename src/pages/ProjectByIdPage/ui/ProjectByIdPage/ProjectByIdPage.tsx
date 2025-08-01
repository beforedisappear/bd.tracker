import { ProjectView } from '@/widgets/ProjectView';
import { TaskFilters } from '@/widgets/TaskFilters';
import { TaskOverviewSheet } from '@/widgets/TaskOverviewSheet';

import { DeleteBoard } from '@/features/Board/DeleteBoard';
import { SelectProjectView } from '@/features/Project/SelectProjectView';
import { ManageProjectMembers } from '@/features/Project/ManageProjectMembers';
import { ManageStickers } from '@/features/ManageStickers';

import { BoardStoreProvider } from '@/entities/Board';

export function ProjectByIdPage() {
  return (
    <BoardStoreProvider>
      <div className='flex flex-col gap-4 w-full h-full'>
        <div className='flex w-full gap-4 h-8'>
          <SelectProjectView />
          <TaskFilters />
        </div>

        <ProjectView />
      </div>

      <ManageProjectMembers />
      <DeleteBoard />
      <ManageStickers />
      <TaskOverviewSheet />
    </BoardStoreProvider>
  );
}
