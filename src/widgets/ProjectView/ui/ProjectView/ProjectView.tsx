'use client';

import { ProjectViewWrapper } from '../ProjectViewWrapper/ProjectViewWrapper';
import { ViewBoard, ViewBoardLoading } from '@/features/ViewBoard';
import { CreateColumn } from '@/features/CreateColumn';
import { DeleteColumn } from '@/features/DeleteColumn';
import { CreateTask } from '@/features/CreateTask';

import { useQuery } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/useDeviceType';

import { boardQueries } from '@/entities/Board';
import { getContentMargin } from '../../lib/getContentMargin';
import { restoreTasksOrder } from '../../lib/restoreTasksOrder';
import { restoreColumnsOrder } from '../../lib/restoreColumnsOrder';
import { ErrorBoundary } from '@/shared/ui/c';

import type { Board } from '@/entities/Board';

//TODO: add choose project view
export function ProjectView() {
  const { boardId } = useProject();
  const { isMobile } = useDeviceType();

  const {
    data: board,
    isLoading,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    ...boardQueries.getBoardById({ boardId: boardId as string }),
    enabled: !!boardId,
  });

  if (isLoading) return <ViewBoardLoading />;
  else if (isError || !board)
    return <ErrorBoundary className='m-auto' error={error} reset={refetch} />;

  const normalizedBoard: Board = {
    ...board,
    columns:
      board.columns.length > 0
        ? restoreColumnsOrder(board.columns).map(column => ({
            ...column,
            tasks:
              column.tasks.length > 0 ? restoreTasksOrder(column.tasks) : [],
          }))
        : [],
  };

  return (
    <ProjectViewWrapper>
      <div
        className='flex gap-4'
        style={{ marginInline: getContentMargin(isMobile) }}
      >
        {/* TODO: add key to ViewBoard */}
        <ViewBoard key={dataUpdatedAt} board={normalizedBoard} />
        <CreateColumn />
      </div>

      <CreateTask />
      <DeleteColumn />
    </ProjectViewWrapper>
  );
}
