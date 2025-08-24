import { type Active } from '@dnd-kit/core';
import { type DraggableItemType } from '../model/types';

export function isTypeActive(active: Active, type: DraggableItemType) {
  return active.data.current?.type === type;
}
