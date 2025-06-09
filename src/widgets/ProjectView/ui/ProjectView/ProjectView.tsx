'use client';

import { ViewBoard, ViewBoardLoading } from '@/features/ViewBoard';
import { CreateColumn } from '@/features/CreateColumn';
import { DeleteColumn } from '@/features/DeleteColumn';
import { CreateTask } from '@/features/CreateTask';
import { ErrorBoundary } from '@/shared/ui/c';
import { ProjectViewWrapper } from '../ProjectViewWrapper/ProjectViewWrapper';

import { useQuery } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/useDeviceType';
import {
  useBoardStore,
  boardQueries,
  getMapColorTaskFilterByBoardId,
} from '@/entities/Board';

import { getContentMargin } from '../../lib/getContentMargin';
import { restoreTasksOrder } from '../../lib/restoreTasksOrder/restoreTasksOrder';
import { restoreColumnsOrder } from '../../lib/restoreColumnsOrder/restoreColumnsOrder';

//TODO: add choose project view
export function ProjectView() {
  const { boardId } = useProject();
  const { isMobile } = useDeviceType();

  const { mapColorTaskFilterByBoardId } = useBoardStore(
    getMapColorTaskFilterByBoardId(),
  );

  const colors = mapColorTaskFilterByBoardId[boardId];

  const {
    data: board,
    isLoading,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    ...boardQueries.getBoardById({
      boardId: boardId!,
    }),
    enabled: !!boardId,
    select: res => {
      return {
        ...res,
        columns: restoreColumnsOrder(res.columns).map(column => ({
          ...column,
          tasks: restoreTasksOrder(column.tasks),
        })),
      };
    },
  });

  if (isLoading) return <ViewBoardLoading />;
  else if (isError || !board)
    return <ErrorBoundary className='m-auto' error={error} reset={refetch} />;

  const isFiltered = colors && colors.length > 0 ? true : false;

  return (
    <ProjectViewWrapper>
      <div
        className='flex gap-4'
        style={{ marginInline: getContentMargin(isMobile) }}
      >
        {/* TODO: add key to ViewBoard */}
        <ViewBoard
          key={dataUpdatedAt}
          board={board}
          colors={colors}
          isFiltered={isFiltered}
        />
        <CreateColumn />
      </div>

      <CreateTask />
      <DeleteColumn />
    </ProjectViewWrapper>
  );
}
