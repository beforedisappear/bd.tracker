import type { GetBoardByIdDtoRes, CreateTaskDtoRes } from '../../types';

type Res = CreateTaskDtoRes;
type Cache = GetBoardByIdDtoRes;

export const createTaskQueryUpdater = (res: Res) => (oldData: Cache) => {
  const targetColumn = oldData.columns.find(
    column => column.id === res.columnId,
  );

  if (!targetColumn) return oldData;

  return {
    ...oldData,
    columns: oldData.columns.map(column =>
      column.id === targetColumn.id
        ? { ...column, tasks: [...column.tasks, res] }
        : column,
    ),
  };
};
