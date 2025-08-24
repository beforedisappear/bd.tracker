import { type Over } from '@dnd-kit/core';
import { type DraggableItemType } from '../model/types';

export function isTypeOver(over: Over | null, type: DraggableItemType) {
  if (!over) return false;

  return over.data.current?.type === type;
}
