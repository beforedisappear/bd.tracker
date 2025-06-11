import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';
import { ViewBoardColumnWrapper } from '../ViewBoardColumnWrapper/ViewBoardColumnWrapper';
import { ViewBoardColumnHeader } from '../ViewBoardColumnHeader/ViewBoardColumnHeader';
import { ViewBoardColumnCreateTaskBtn } from '../ViewBoardColumnCreateTaskBtn/ViewBoardColumnCreateTaskBtn';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { Column, Color } from '@/entities/Board';
import type { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';

interface Props {
  data: Column;
  sortableTaskIds: string[];
  colors?: Color[];
  assignees?: string[];
  dateRange?: DateRange;
  isFiltered?: boolean;
}

// TODO: add SCROLL AREA
export function ViewBoardColumn(props: Props) {
  const {
    data: { id, name, tasks },
    sortableTaskIds,
    colors,
    assignees,
    dateRange,
  } = props;

  return (
    <ViewBoardColumnWrapper id={id}>
      <div className={`flex flex-col h-auto gap-2 p-4 bg-muted rounded-lg`}>
        <ViewBoardColumnHeader
          columnId={id}
          name={name}
          length={tasks.length}
        />

        <SortableContext
          items={sortableTaskIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks
            .filter(task => !colors?.length || colors.includes(task.color))
            .filter(
              task =>
                !assignees?.length ||
                task.assignees.some(assignee =>
                  assignees.includes(assignee.id),
                ),
            )
            .filter(task => {
              if (!dateRange?.from || !dateRange?.to) return true;

              const taskStartDate = task.startDate
                ? parseISO(task.startDate)
                : null;
              const taskEndDate = task.endDate ? parseISO(task.endDate) : null;

              if (!taskStartDate && !taskEndDate) return true;

              const range = { start: dateRange.from, end: dateRange.to };

              if (taskStartDate && !taskEndDate) {
                return isWithinInterval(taskStartDate, range);
              }

              if (!taskStartDate && taskEndDate) {
                return isWithinInterval(taskEndDate, range);
              }

              if (taskStartDate && taskEndDate) {
                return (
                  isWithinInterval(taskStartDate, range) ||
                  isWithinInterval(taskEndDate, range) ||
                  (taskStartDate <= dateRange.from &&
                    taskEndDate >= dateRange.to)
                );
              }

              return true;
            })
            .map(task => (
              <ViewBoardTask key={task.id} data={task} />
            ))}
        </SortableContext>

        <ViewBoardColumnCreateTaskBtn columnId={id} />
      </div>
    </ViewBoardColumnWrapper>
  );
}
