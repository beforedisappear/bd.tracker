import type { Task } from '../types';

export function getTaskByTaskId(tasks: Task[], taskId: string) {
  return tasks.find(task => task.id === taskId);
}
