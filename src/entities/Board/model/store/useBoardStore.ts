import { useStore } from 'zustand';
import { use } from 'react';
import { BoardStoreContext } from './BoardStoreContext';

import type { BoardStore } from './types';

export const useBoardStore = <T>(selector: (store: BoardStore) => T): T => {
  const storeContext = use(BoardStoreContext);

  if (!storeContext) {
    throw new Error('useBoardStore must be used within BoardStoreProvider');
  }

  return useStore(storeContext, selector);
};
