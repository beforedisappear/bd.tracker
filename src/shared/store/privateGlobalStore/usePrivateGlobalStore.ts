import { useStore } from 'zustand';
import { useContext } from 'react';

import { PrivateGlobalStoreContext } from './PrivateGlobalStoreContext';

import type { PrivateGlobalStore } from './types';

export const usePrivateGlobalStore = <T>(
  selector: (store: PrivateGlobalStore) => T,
): T => {
  const storeContext = useContext(PrivateGlobalStoreContext);

  if (!storeContext) {
    throw new Error(`useStore must be used within StoreProvider`);
  }

  return useStore(storeContext, selector);
};
