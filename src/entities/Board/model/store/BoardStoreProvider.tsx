'use client';

import { BoardStoreContext } from './BoardStoreContext';

import { useRef, type ReactNode } from 'react';
import { createBoardStore, type BoardStoreApi } from './boardStore';

interface Props {
  children: ReactNode;
}

export const BoardStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<BoardStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createBoardStore();
  }

  return (
    <BoardStoreContext.Provider value={storeRef.current}>
      {children}
    </BoardStoreContext.Provider>
  );
};
