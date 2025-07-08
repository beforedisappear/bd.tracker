import { restoreOrder } from './restoreOrder';
import { isWithinInterval } from 'date-fns';
import type { Board, Task, DateRange } from '@/entities/Board';

type Filters = {
  colors?: string[];
  assigneeIds?: string[];
  dateRange?: DateRange;
  stickerIds?: string[];
};

const sortByColor = (task: Task, filters: Filters) =>
  filters.colors?.length !== 0 || filters.colors?.includes(task.color);

const sortByAssignee = (task: Task, filters: Filters) =>
  filters.assigneeIds?.length !== 0 ||
  filters.assigneeIds.some(assigneeId =>
    task.assignees.some(assignee => assignee.id === assigneeId),
  );

const sortBySticker = (task: Task, filters: Filters) =>
  filters.stickerIds?.length !== 0 ||
  filters.stickerIds.some(stickerId =>
    task.stickers.some(sticker => sticker.id === stickerId),
  );

const sortByDate = (task: Task, filters: Filters) => {
  if (!filters.dateRange || !task.startDate || !task.endDate) return true;

  const range = {
    start: filters.dateRange.from!,
    end: filters.dateRange.to!,
  };

  const isStartDateInRange = isWithinInterval(task.startDate, range);

  const isEndDateInRange = isWithinInterval(task.endDate, range);

  return isStartDateInRange || isEndDateInRange;
};

// дополнительно сортируем данные в соответствии с фильтрами,
// чтобы не отобразить задачи внесенные в кэш из Realtime обновления
export const normalizeAndSortBoardData = (res: Board, filters: Filters) => ({
  ...res,
  columns: restoreOrder(res.columns).map(column => ({
    ...column,
    tasks: restoreOrder(column.tasks)
      .filter(task => sortByColor(task, filters))
      .filter(task => sortByAssignee(task, filters))
      .filter(task => sortBySticker(task, filters))
      .filter(task => sortByDate(task, filters)),
  })),
});
