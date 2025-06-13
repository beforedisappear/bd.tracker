'use client';

import { ProjectView } from '@/widgets/ProjectView';
import { TaskFilters } from '@/widgets/TaskFilters';
import { TaskOverviewSheet } from '@/widgets/TaskOverviewSheet';

import { DeleteBoard } from '@/features/DeleteBoard';
import { SelectProjectView } from '@/features/SelectProjectView';
import { ManageProjectMembers } from '@/features/ManageProjectMembers';

import { ProjectStoreProvider } from '@/entities/Project';
import { BoardStoreProvider } from '@/entities/Board';

import { useScrollLock } from '@/shared/lib/ui';
import { ManageStickers } from '@/features/ManageStickers';

export function ProjectByIdPage() {
  useScrollLock({ enabled: true, type: 'x' });

  return (
    <ProjectStoreProvider>
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
    </ProjectStoreProvider>
  );
}
