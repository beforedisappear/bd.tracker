import { closestCenter, type CollisionDetection } from '@dnd-kit/core';
import { isTypeActive } from './isTypeActive';

export const customCollisionDetection: CollisionDetection = ({
  active,
  droppableContainers,
  ...args
}) => {
  const pointerCollisions = closestCenter({
    active,
    droppableContainers,
    ...args,
  });

  if (isTypeActive(active, 'Column')) {
    const filtered = pointerCollisions.filter(entry => {
      const target = droppableContainers.find(c => c.id === entry.id);
      return target?.data?.current?.type === 'Column';
    });

    return filtered;
  }

  return pointerCollisions;
};
