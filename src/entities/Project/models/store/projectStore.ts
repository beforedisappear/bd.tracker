import { createStore as createZustandStore } from 'zustand/vanilla';

import type { ProjectStore, ProjectStoreState } from './types';

export type ProjectStoreApi = ReturnType<typeof createProjectStore>;

const defaultInitState: ProjectStoreState = {};

export const createProjectStore = (
  initState: ProjectStoreState = defaultInitState,
) => {
  return createZustandStore<ProjectStore>()(() => ({
    ...initState,
  }));
};
