import { createStore as createZustandStore } from 'zustand/vanilla';

import type { BoardStore, BoardStoreState } from './types';
import type { Color } from '../types';

export type BoardStoreApi = ReturnType<typeof createBoardStore>;

const defaultInitState: BoardStoreState = {
  showDeleteColumnModal: false,
  showCreateTaskModal: false,
  currentColumnId: null, // for create or delete task
  mapColorTaskFilterByBoardId: {},
};

export const createBoardStore = (
  initState: BoardStoreState = defaultInitState,
) => {
  return createZustandStore<BoardStore>()(set => ({
    ...initState,
    setShowDeleteColumnModal: (show: boolean) =>
      set({ showDeleteColumnModal: show }),

    setCurrentColumnId: (id: string | null) => set({ currentColumnId: id }),

    setShowCreateTaskModal: (show: boolean) =>
      set({ showCreateTaskModal: show }),

    setMapColorTaskFilterByBoardId: (boardId: string, colors: Color[]) =>
      set(state => ({
        mapColorTaskFilterByBoardId: {
          ...state.mapColorTaskFilterByBoardId,
          [boardId]: colors,
        },
      })),

    clearMapColorTaskFilterByBoardId: () =>
      set({ mapColorTaskFilterByBoardId: {} }),
  }));
};
