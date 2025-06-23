export function getItemWithHighestOrder<T extends { order: number }>(
  items: T[],
): T {
  return items.reduce((prev, curr) => (prev.order > curr.order ? prev : curr));
}
