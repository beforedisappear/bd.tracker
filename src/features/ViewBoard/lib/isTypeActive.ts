import { type Active } from '@dnd-kit/core';

export function isTypeActive(active: Active, type: 'Column' | 'Task') {
  return active.data.current?.type === type;
}
