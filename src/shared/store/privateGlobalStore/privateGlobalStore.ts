import { createStore as createZustandStore } from 'zustand/vanilla';

import type { IPrivateGlobalStoreState, PrivateGlobalStore } from './types';

export type PrivateGlobalStoreApi = ReturnType<typeof createPrivateGlobalStore>;

const defaultInitState: IPrivateGlobalStoreState = {
  teamIdBySlugMap: {},
  showProjectMembersModal: false,
  currentProjectId: null,
};

export const createPrivateGlobalStore = (
  initState: IPrivateGlobalStoreState = defaultInitState,
) => {
  return createZustandStore<PrivateGlobalStore>()(set => ({
    ...initState,
    setTeamIdBySlugMap: (map: Record<string, string>) => {
      set({ teamIdBySlugMap: map });
    },
    setShowProjectMembersModal: (show: boolean) => {
      set({ showProjectMembersModal: show });
    },
    setCurrentProjectId: (id: string) => {
      set({ currentProjectId: id });
    },
  }));
};
