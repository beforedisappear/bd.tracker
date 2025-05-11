import { useStore } from 'zustand';
import { use } from 'react';
import { TeamStoreContext } from './TeamStoreContext';

import type { TeamStore } from './types';

export const useTeamStore = <T>(selector: (store: TeamStore) => T): T => {
  const storeContext = use(TeamStoreContext);

  if (!storeContext) {
    throw new Error('useTeamStore must be used within TeamStoreProvider');
  }

  return useStore(storeContext, selector);
};
