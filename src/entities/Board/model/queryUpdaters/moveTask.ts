import type { GetBoardByIdDtoRes, MoveTaskDtoReq } from '../types';

type Args = MoveTaskDtoReq;
type Cache = GetBoardByIdDtoRes;

export const moveTaskQueryUpdater = (args: Args) => (oldData: Cache) => {
  const { taskId, columnId, order } = args;

  const sourceColumn = oldData.columns.find(column =>
    column.tasks.some(task => task.id === taskId),
  );

  if (!sourceColumn) return oldData;

  const targetTask = sourceColumn.tasks.find(task => task.id === taskId);

  if (!targetTask) return oldData;

  const updatedTask = { ...targetTask, columnId, order };

  if (columnId === sourceColumn.id) {
    return {
      ...oldData,
      columns: oldData.columns.map(column => {
        if (column.id === sourceColumn.id) {
          const taskIndex = column.tasks.findIndex(task => task.id === taskId);

          return {
            ...column,
            tasks: [
              ...column.tasks.slice(0, taskIndex),
              ...column.tasks.slice(taskIndex + 1),
              updatedTask,
            ],
          };
        }
        return column;
      }),
    };
  }

  return {
    ...oldData,
    columns: oldData.columns.map(column => {
      if (column.id === sourceColumn.id) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId),
        };
      }

      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, updatedTask],
        };
      }

      return column;
    }),
  };
};
