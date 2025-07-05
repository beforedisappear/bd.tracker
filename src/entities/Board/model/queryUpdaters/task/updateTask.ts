import type { GetBoardByIdDtoRes, UpdateTaskDtoRes } from '../../types';

type Res = UpdateTaskDtoRes;
type Cache = GetBoardByIdDtoRes;

export const updateTaskQueryUpdater = (data: Res) => (oldData: Cache) => {
  const targetColumn = oldData.columns.find(column =>
    column.tasks.some(task => task.id === data.id),
  );

  if (!targetColumn) return oldData;

  return {
    ...oldData,
    columns: oldData.columns.map(column =>
      column.id === targetColumn.id
        ? {
            ...column,
            tasks: column.tasks.map(task =>
              task.id === data.id ? data : task,
            ),
          }
        : column,
    ),
  };
};
