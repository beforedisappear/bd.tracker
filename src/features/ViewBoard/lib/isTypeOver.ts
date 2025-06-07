import { type Over } from '@dnd-kit/core';

export function isTypeOver(over: Over | null, type: 'Column' | 'Task') {
  if (!over) return false;

  return over.data.current?.type === type;
}
