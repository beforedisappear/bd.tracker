'use client';

import {
  type PrivateGlobalStoreApi,
  PrivateGlobalStoreContext,
  createPrivateGlobalStore,
} from '@/shared/store/privateGlobalStore';

import { type ReactNode, useRef } from 'react';

interface IProps {
  children: ReactNode;
}

export const PrivateGlobalStoreProvider = ({ children }: IProps) => {
  const storeRef = useRef<PrivateGlobalStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createPrivateGlobalStore();
  }

  return (
    <PrivateGlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </PrivateGlobalStoreContext.Provider>
  );
};
