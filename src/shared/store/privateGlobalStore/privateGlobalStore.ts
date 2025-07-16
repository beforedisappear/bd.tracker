import { createStore as createZustandStore } from 'zustand/vanilla';

import { createProjectSlice, IProjectSliceState } from './slices/projectSlice';
import { createBoardSlice, IBoardSliceState } from './slices/boardSlice';

import type { IPrivateGlobalStoreState, PrivateGlobalStore } from './types';

export type PrivateGlobalStoreApi = ReturnType<typeof createPrivateGlobalStore>;

type GlobalInitState = Omit<
  IPrivateGlobalStoreState,
  keyof IProjectSliceState | keyof IBoardSliceState
>;

const defaultState: GlobalInitState = {
  teamIdBySlugMap: {},
};

export const createPrivateGlobalStore = (
  initState: GlobalInitState = defaultState,
) => {
  return createZustandStore<PrivateGlobalStore>()((set, get, api) => ({
    ...initState,
    ...createProjectSlice(set, get, api),
    ...createBoardSlice(set, get, api),
    setTeamIdBySlugMap: (map: Record<string, string>) =>
      set({ teamIdBySlugMap: map }),
    setShowDeleteBoardModal: (show: boolean) =>
      set({ showDeleteBoardModal: show }),
    setShowManageStickersModal: (show: boolean) =>
      set({ showManageStickersModal: show }),
  }));
};
