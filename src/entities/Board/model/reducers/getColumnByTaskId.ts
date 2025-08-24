import type { Column } from '../types';

export function getColumnByTaskId(columns: Column[], taskId: string) {
  return columns.find(column => column.tasks.some(task => task.id === taskId));
}
