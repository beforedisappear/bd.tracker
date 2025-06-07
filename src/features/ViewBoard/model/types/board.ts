export type DraggableItemType = 'Task' | 'Column';

export type DraggableItemObj = {
  id: string;
  type: DraggableItemType;
};

export const IsDraggableItem = (item: unknown): item is DraggableItemType => {
  return item === 'Task' || item === 'Column';
};
