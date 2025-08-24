import { closestCenter, type CollisionDetection } from '@dnd-kit/core';

import { isTypeActive } from '@/entities/Board';

export const customCollisionDetection: CollisionDetection = ({
  active,
  droppableContainers,
  ...args
}) => {
  const collisions = closestCenter({
    active,
    droppableContainers,
    ...args,
  });

  if (isTypeActive(active, 'Column')) {
    const filtered = collisions.filter(entry => {
      const target = droppableContainers.find(c => c.id === entry.id);
      return target?.data?.current?.type === 'Column';
    });

    return filtered;
  }

  return collisions;
};
