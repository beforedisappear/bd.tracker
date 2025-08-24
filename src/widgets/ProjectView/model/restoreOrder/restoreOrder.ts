export function restoreOrder<T extends { order: number }>(items: T[]) {
  if (items.length === 0) return [];

  return [...items].sort((a, b) => a.order - b.order);
}
