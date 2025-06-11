import type { Board, Task } from '../model/types';

export function mapTasksById(board: Board): Record<string, Task> {
  return board.columns.reduce(
    (acc, column) => {
      column.tasks.forEach(task => {
        acc[task.id] = task;
      });
      return acc;
    },
    {} as Record<string, Board['columns'][number]['tasks'][number]>,
  );
}
