import { useStore } from 'zustand';
import { useContext } from 'react';
import { GlobalStoreContext } from './GlobalStoreContext';

import type { GlobalStore } from './store';

export const useGloabalStore = <T>(selector: (store: GlobalStore) => T): T => {
  const storeContext = useContext(GlobalStoreContext);

  if (!storeContext) {
    throw new Error(`useStore must be used within StoreProvider`);
  }

  return useStore(storeContext, selector);
};
