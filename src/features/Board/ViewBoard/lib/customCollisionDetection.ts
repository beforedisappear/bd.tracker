import { closestCenter, type CollisionDetection } from '@dnd-kit/core';

export const customCollisionDetection: CollisionDetection = ({
  active,
  droppableContainers,
  ...args
}) => {
  const activeType = active.data?.current?.type;

  const pointerCollisions = closestCenter({
    active,
    droppableContainers,
    ...args,
  });

  if (activeType === 'Column') {
    const filtered = pointerCollisions.filter(entry => {
      const target = droppableContainers.find(c => c.id === entry.id);
      return target?.data?.current?.type === 'Column';
    });

    return filtered;
  }

  return pointerCollisions;
};
