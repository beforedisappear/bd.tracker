import { createJSONStorage, persist } from 'zustand/middleware';
import type { BoardStore, CreateBoardStoreArgs } from './types';

const persistMiddlwareConfig = {
  name: 'board_store',
  storage: createJSONStorage(() => sessionStorage),
  partialize: (state: BoardStore) => ({
    mapColorTaskFilterByBoardId: state.mapColorTaskFilterByBoardId,
    mapAssigneesTaskFilterByBoardId: state.mapAssigneesTaskFilterByBoardId,
    mapDateRangeTaskFilterByBoardId: state.mapDateRangeTaskFilterByBoardId,
    mapStickerTaskFilterByBoardId: state.mapStickerTaskFilterByBoardId,
  }),
};

export const persistBoardMiddlware = (
  func: (...args: CreateBoardStoreArgs) => BoardStore,
) => persist(func, persistMiddlwareConfig);
