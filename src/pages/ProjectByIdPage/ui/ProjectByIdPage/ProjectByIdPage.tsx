'use client';

import { ProjectView } from '@/widgets/ProjectView';
import { TaskFilters } from '@/widgets/TaskFilters';

import { DeleteBoard } from '@/features/DeleteBoard';
import { SelectProjectView } from '@/features/SelectProjectView';
import { ManageProjectMembers } from '@/features/ManageProjectMembers';

import { ProjectStoreProvider } from '@/entities/Project';

import { useScrollLock } from '@/shared/lib/ui';

export function ProjectByIdPage() {
  useScrollLock({ enabled: true, type: 'x' });

  return (
    <ProjectStoreProvider>
      <div className='flex flex-col gap-4 w-full h-full'>
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
