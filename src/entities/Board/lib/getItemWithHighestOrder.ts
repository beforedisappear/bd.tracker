type ItemWithOrder = { order: number };

export function getItemWithHighestOrder<T extends ItemWithOrder>(
  items: T[],
): T | null {
  if (items.length === 0) {
    return null;
  }

  return items.reduce((prev, curr) => (prev.order > curr.order ? prev : curr));
}
