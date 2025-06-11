import { createStore as createZustandStore } from 'zustand/vanilla';

import type { DateRange } from 'react-day-picker';
import type { BoardStore, BoardStoreState } from './types';
import type { Color } from '../types';

export type BoardStoreApi = ReturnType<typeof createBoardStore>;

const defaultInitState: BoardStoreState = {
  showDeleteColumnModal: false,
  showCreateTaskModal: false,
  currentColumnId: null, // for create or delete task
  mapColorTaskFilterByBoardId: {},
  mapAssigneesTaskFilterByBoardId: {},
  mapDateTaskFilterByBoardId: {},
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

    setMapAssigneesTaskFilterByBoardId: (
      boardId: string,
      assignees: string[],
    ) =>
      set(state => ({
        mapAssigneesTaskFilterByBoardId: {
          ...state.mapAssigneesTaskFilterByBoardId,
          [boardId]: assignees,
        },
      })),

    setMapDateTaskFilterByBoardId: (boardId: string, date: DateRange) =>
      set(state => ({
        mapDateTaskFilterByBoardId: {
          ...state.mapDateTaskFilterByBoardId,
          [boardId]: date,
        },
      })),

    clearAllMapFilters: () =>
      set(() => ({
        mapColorTaskFilterByBoardId: {},
        mapAssigneesTaskFilterByBoardId: {},
      })),
  }));
};
