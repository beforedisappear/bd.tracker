import type { GetBoardByIdDtoRes, DeleteTaskDtoReq } from '../../types';

type Arg = DeleteTaskDtoReq;
type Cache = GetBoardByIdDtoRes;

export const deleteTaskQueryUpdater =
  ({ id }: Arg) =>
  (oldData: Cache) => {
    const targetColumn = oldData.columns.find(column =>
      column.tasks.some(task => task.id === id),
    );

    if (!targetColumn) return oldData;

    return {
      ...oldData,
      columns: oldData.columns.map(column =>
        column.id === targetColumn.id
          ? {
              ...column,
              tasks: column.tasks.filter(task => task.id !== id),
            }
          : column,
      ),
    };
  };
