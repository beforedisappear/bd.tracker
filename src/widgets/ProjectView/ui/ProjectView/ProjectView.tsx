'use client';

import { ProjectViewWrapper } from '../ProjectViewWrapper/ProjectViewWrapper';
import { ViewBoard } from '@/features/ViewBoard';
import { CreateColumn } from '@/features/CreateColumn';
import { DeleteColumn } from '@/features/DeleteColumn';
import { CreateTask } from '@/features/CreateTask';

import { useQuery } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/useDeviceType';

import { boardQueries } from '@/entities/Board';
import { getContentMargin } from '../../lib/getContentMargin';
import { restoreColumnsOrder } from '../../lib/restoreColumnsOrder';

export function ProjectView() {
  const { boardId } = useProject();
  const { isMobile } = useDeviceType();

  const {
    data: board,
    isLoading,
    isError,
  } = useQuery({
    ...boardQueries.getBoardById({ boardId: boardId as string }),
    enabled: !!boardId,
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError || !board) return <div>Error</div>;

  const normalizedBoard = {
    ...board,
    columns: board.columns.length > 0 ? restoreColumnsOrder(board.columns) : [],
  };

  return (
    <ProjectViewWrapper>
      <div
        className='flex gap-4'
        style={{ marginInline: getContentMargin(isMobile) }}
      >
        <ViewBoard board={normalizedBoard} />
        <CreateColumn />
      </div>

      <CreateTask />
      <DeleteColumn />
    </ProjectViewWrapper>
  );
}
