import { createStore as createZustandStore } from 'zustand/vanilla';

import type { BoardStore, BoardStoreState } from './types';

export type BoardStoreApi = ReturnType<typeof createBoardStore>;

const defaultInitState: BoardStoreState = {};

export const createBoardStore = (
  initState: BoardStoreState = defaultInitState,
) => {
  return createZustandStore<BoardStore>()(() => ({
    ...initState,
  }));
};
