'use client';

import {
  type GlobalStoreApi,
  GlobalStoreContext,
  createStore,
} from '@/shared/store/globalStore';

import { type ReactNode, useRef } from 'react';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<GlobalStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};
