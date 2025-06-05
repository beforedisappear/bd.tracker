import { createStore as createZustandStore } from 'zustand/vanilla';

import type { ProjectStore, ProjectStoreState } from './types';

export type ProjectStoreApi = ReturnType<typeof createProjectStore>;

const defaultInitState: ProjectStoreState = {
  deletingColumnId: null,
  showDeleteColumnModal: false,
};

export const createProjectStore = (
  initState: ProjectStoreState = defaultInitState,
) => {
  return createZustandStore<ProjectStore>()(set => ({
    ...initState,
    setDeletingColumnId: (id: string | null) => {
      set({ deletingColumnId: id });
    },
    setShowDeleteColumnModal: (show: boolean) => {
      set({ showDeleteColumnModal: show });
    },
  }));
};
