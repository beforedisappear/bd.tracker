import { type Column } from '../types';

export function getColumnByColumnId(columns: Column[], columnId: string) {
  return columns.find(column => column.id === columnId);
}
