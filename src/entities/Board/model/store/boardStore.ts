import { createStore as createZustandStore } from 'zustand/vanilla';

import type { BoardStore, BoardStoreState } from './types';

export type BoardStoreApi = ReturnType<typeof createBoardStore>;

const defaultInitState: BoardStoreState = {
  showDeleteColumnModal: false,
  deletingColumnId: null,
  showCreateTaskModal: false,
};

export const createBoardStore = (
  initState: BoardStoreState = defaultInitState,
) => {
  return createZustandStore<BoardStore>()(set => ({
    ...initState,
    setShowDeleteColumnModal: (show: boolean) =>
      set({ showDeleteColumnModal: show }),
    setDeletingColumnId: (id: string | null) => set({ deletingColumnId: id }),
    setShowCreateTaskModal: (show: boolean) =>
      set({ showCreateTaskModal: show }),
  }));
};
