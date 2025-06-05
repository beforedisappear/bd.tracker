import { createStore as createZustandStore } from 'zustand/vanilla';

import type { BoardStore, BoardStoreState } from './types';

export type BoardStoreApi = ReturnType<typeof createBoardStore>;

const defaultInitState: BoardStoreState = {
  showDeleteColumnModal: false,
  showCreateTaskModal: false,
  currentColumnId: null, // for create or delete task
};

export const createBoardStore = (
  initState: BoardStoreState = defaultInitState,
) => {
  return createZustandStore<BoardStore>()(set => ({
    ...initState,
    setShowDeleteColumnModal: (show: boolean) =>
      set({ showDeleteColumnModal: show }),
    setCurrentColumnId: (id: string) => set({ currentColumnId: id }),
    setShowCreateTaskModal: (show: boolean) =>
      set({ showCreateTaskModal: show }),
  }));
};
