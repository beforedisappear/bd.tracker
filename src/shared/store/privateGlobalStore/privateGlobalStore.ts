import { createStore as createZustandStore } from 'zustand/vanilla';

import type { IPrivateGlobalStoreState, PrivateGlobalStore } from './types';

export type PrivateGlobalStoreApi = ReturnType<typeof createPrivateGlobalStore>;

type GlobalInitState = IPrivateGlobalStoreState;

const defaultState: GlobalInitState = {
  teamIdBySlugMap: {},
};

export const createPrivateGlobalStore = (
  initState: GlobalInitState = defaultState,
) => {
  return createZustandStore<PrivateGlobalStore>()(set => ({
    ...initState,
    setTeamIdBySlugMap: (map: Record<string, string>) =>
      set({ teamIdBySlugMap: map }),
  }));
};
