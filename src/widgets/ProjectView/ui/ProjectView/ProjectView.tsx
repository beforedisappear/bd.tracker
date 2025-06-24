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
  getAllMapTaskFilters,
} from '@/entities/Board';

import { getContentMargin } from '../../lib/getContentMargin';
import { restoreOrder } from '../../lib/restoreOrder/restoreOrder';

//TODO: add choose project view
export function ProjectView() {
  const { boardId } = useProject();
  const { isMobile } = useDeviceType();

  const { colorMap, assigneesMap, dateRangeMap, stickersMap } = useBoardStore(
    getAllMapTaskFilters(),
  );

  const colors = colorMap[boardId];
  const assignees = assigneesMap[boardId];
  const dateRange = dateRangeMap[boardId];
  const stickers = stickersMap[boardId];

  const withColorFilter = colors && colors.length > 0;
  const withAssigneeFilter = assignees && assignees.length > 0;
  const withDateRangeFilter = dateRange && dateRange.from && dateRange.to;
  const withStickerFilter = stickers && stickers.length > 0;

  const {
    data: board,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    ...boardQueries.getBoardById({
      boardId: boardId!,
      colors: withColorFilter ? colors : undefined,
      assigneeIds: withAssigneeFilter ? assignees : undefined,
      dateRange: withDateRangeFilter ? dateRange : undefined,
      stickerIds: withStickerFilter ? stickers : undefined,
    }),
    enabled: !!boardId,
    gcTime: 0,
    staleTime: 0,
    select: res => ({
      ...res,
      columns: restoreOrder(res.columns).map(column => ({
        ...column,
        tasks: restoreOrder(column.tasks),
      })),
    }),
  });

  if (isLoading) return <ViewBoardLoading />;
  else if (isError || !board)
    return <ErrorBoundary className='m-auto' error={error} reset={refetch} />;

  return (
    <ProjectViewWrapper>
      <div
        className='flex gap-4'
        style={{ marginInline: getContentMargin(isMobile) }}
      >
        <ViewBoard board={board} />
        <CreateColumn />
      </div>

      <CreateTask />
      <DeleteColumn />
    </ProjectViewWrapper>
  );
}
