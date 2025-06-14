import { createStore as createZustandStore } from 'zustand/vanilla';

import type { IPrivateGlobalStoreState, PrivateGlobalStore } from './types';

export type PrivateGlobalStoreApi = ReturnType<typeof createPrivateGlobalStore>;

// TODO: add slices for project & team global states
const defaultInitState: IPrivateGlobalStoreState = {
  teamIdBySlugMap: {},
  currentProjectId: null, // to pass to the delete project modal or project members modal
  showProjectMembersModal: false,
  showDeleteProjectModal: false,
  showDeleteBoardModal: false,
  showManageStickersModal: false,
  currentBoardId: null,
};

export const createPrivateGlobalStore = (
  initState: IPrivateGlobalStoreState = defaultInitState,
) => {
  return createZustandStore<PrivateGlobalStore>()(set => ({
    ...initState,
    setTeamIdBySlugMap: (map: Record<string, string>) =>
      set({ teamIdBySlugMap: map }),
    setShowProjectMembersModal: (show: boolean) =>
      set({ showProjectMembersModal: show }),
    setShowDeleteProjectModal: (show: boolean) =>
      set({ showDeleteProjectModal: show }),
    setShowDeleteBoardModal: (show: boolean) =>
      set({ showDeleteBoardModal: show }),
    setShowManageStickersModal: (show: boolean) =>
      set({
        showManageStickersModal: show,
      }),
    setCurrentBoardId: (id: string | null) => set({ currentBoardId: id }),
    setCurrentProjectId: (id: string | null) => set({ currentProjectId: id }),
  }));
};
