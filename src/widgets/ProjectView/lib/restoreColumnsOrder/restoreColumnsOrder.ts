import type { Column } from '@/entities/Board';

export function restoreColumnsOrder(columns: Column[]) {
  if (columns.length === 0) return [];

  const mapColumnsById: Record<string, Column> = {};
  const setOfNextColumnIds = new Set<string>();
  const mapOfPreviousColumnIds = new Map<string, string>();

  for (const col of columns) {
    mapColumnsById[col.id] = col;

    if (col.nextColumnId != null) {
      setOfNextColumnIds.add(col.nextColumnId);
      mapOfPreviousColumnIds.set(col.nextColumnId, col.id);
    }
  }

  const head = columns.find(col => !setOfNextColumnIds.has(col.id));

  if (!head) throw new Error('Head not found');

  const ordered: Column[] = [];
  let current: Column | null = head;

  while (current) {
    ordered.push(current);

    current = current.nextColumnId
      ? mapColumnsById[current.nextColumnId]
      : null;
  }

  return ordered;
}
