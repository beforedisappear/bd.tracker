import type { MoveColumnDtoRes, GetBoardByIdDtoRes } from '../../types';

type Res = MoveColumnDtoRes;
type Cache = GetBoardByIdDtoRes;

export const moveColumnQueryUpdater = (res: Res) => (cache: Cache) => {
  const { id, newOrder } = res;

  const column = cache.columns.find(column => column.id === id);

  if (!column) return cache;

  const newColumns = cache.columns.map(column =>
    column.id === id ? { ...column, order: newOrder } : column,
  );

  return {
    ...cache,
    columns: newColumns,
  };
};
