import {
  createStore as createZustandStore,
  StateCreator,
} from 'zustand/vanilla';

import { persistBoardMiddlware } from './middlaware';

import type { DateRange } from '../types/dateRange';
import type { BoardStore, BoardStoreState } from './types';
import type { Color } from '../types';

export type BoardStoreApi = ReturnType<typeof createBoardStore>;

const defaultInitState: BoardStoreState = {
  showDeleteColumnModal: false,
  showCreateTaskModal: false,
  currentColumnId: null, // for create or delete task
  mapColorTaskFilterByBoardId: {},
  mapAssigneesTaskFilterByBoardId: {},
  mapDateRangeTaskFilterByBoardId: {},
  mapStickerTaskFilterByBoardId: {},
};

export const createBoardStore = (
  initState: BoardStoreState = defaultInitState,
) => {
  const state: StateCreator<BoardStore, [], []> = set => ({
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

    setMapDateRangeTaskFilterByBoardId: (boardId: string, date: DateRange) =>
      set(state => ({
        mapDateRangeTaskFilterByBoardId: {
          ...state.mapDateRangeTaskFilterByBoardId,
          [boardId]: date,
        },
      })),

    setMapStickerTaskFilterByBoardId: (boardId: string, stickers: string[]) =>
      set(state => ({
        mapStickerTaskFilterByBoardId: {
          ...state.mapStickerTaskFilterByBoardId,
          [boardId]: stickers,
        },
      })),

    clearAllMapFilters: () =>
      set(() => ({
        mapColorTaskFilterByBoardId: {},
        mapAssigneesTaskFilterByBoardId: {},
        mapDateRangeTaskFilterByBoardId: {},
        mapStickerTaskFilterByBoardId: {},
      })),
  });

  return createZustandStore<BoardStore>()(persistBoardMiddlware(state));
};
