'use client';

import { ProjectView } from '@/widgets/ProjectView';
import { TaskFilters } from '@/widgets/TaskFilters';
import { TaskOverviewSheet } from '@/widgets/TaskOverviewSheet';

import { DeleteBoard } from '@/features/Board/DeleteBoard';
import { SelectProjectView } from '@/features/Project/SelectProjectView';
import { ManageProjectMembers } from '@/features/Project/ManageProjectMembers';

import { ProjectStoreProvider } from '@/entities/Project';
import { BoardStoreProvider } from '@/entities/Board';

import { useScrollLock } from '@/shared/lib/ui';
import { ManageStickers } from '@/features/ManageStickers';
import { useSocket } from '@/shared/api/useSocket';
import { useTenant } from '@/shared/lib/navigation';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { teamQueries } from '@/entities/Team';

export function ProjectByIdPage() {
  useScrollLock({ enabled: true, type: 'x' });

  const tenant = useTenant();

  const { data: team, isSuccess } = useQuery(
    teamQueries.getHaveAccessToTeam({
      idOrSlug: tenant,
    }),
  );

  const { sendMessage, isConnected } = useSocket({
    onMessage: message => {
      console.log(message);
    },
  });

  useEffect(() => {
    if (isConnected && isSuccess) {
      const message = JSON.stringify({
        type: 'subscribe',
        tenantId: team.tenantId,
        initiatorId: team.userId,
      });

      sendMessage(message);
    }
  }, [tenant, sendMessage, isConnected, isSuccess, team]);

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
