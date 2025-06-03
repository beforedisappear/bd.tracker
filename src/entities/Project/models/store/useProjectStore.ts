import { useStore } from 'zustand';
import { use } from 'react';
import { ProjectStoreContext } from './ProjectStoreContext';

import type { ProjectStore } from './types';

export const useProjectStore = <T>(selector: (store: ProjectStore) => T): T => {
  const storeContext = use(ProjectStoreContext);

  if (!storeContext) {
    throw new Error('useProjectStore must be used within ProjectStoreProvider');
  }

  return useStore(storeContext, selector);
};
