'use client';

import { TeamStoreContext } from './TeamStoreContext';

import { useRef, type ReactNode } from 'react';
import { createTeamStore, type TeamStoreApi } from './teamStore';

interface Props {
  children: ReactNode;
}

export const TeamStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<TeamStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createTeamStore();
  }

  return (
    <TeamStoreContext.Provider value={storeRef.current}>
      {children}
    </TeamStoreContext.Provider>
  );
};
