import type { GetBoardByIdDtoRes, MoveTaskDtoRes } from '../../types';

type Args = MoveTaskDtoRes;
type Cache = GetBoardByIdDtoRes;

export const moveTaskQueryUpdater = (args: Args) => (oldData: Cache) => {
  const { id, columnId, newOrder } = args;

  console.log(args);

  const sourceColumn = oldData.columns.find(column =>
    column.tasks.some(task => task.id === id),
  );

  if (!sourceColumn) return oldData;

  const targetTask = sourceColumn.tasks.find(task => task.id === id);

  if (!targetTask) return oldData;

  const updatedTask = { ...targetTask, columnId, order: newOrder };

  if (columnId === sourceColumn.id) {
    return {
      ...oldData,
      columns: oldData.columns.map(column => {
        if (column.id === sourceColumn.id) {
          const taskIndex = column.tasks.findIndex(task => task.id === id);

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
          tasks: column.tasks.filter(task => task.id !== id),
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
