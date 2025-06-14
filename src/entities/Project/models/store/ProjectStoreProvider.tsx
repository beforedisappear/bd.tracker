'use client';

import { ProjectStoreContext } from './ProjectStoreContext';

import { useRef, type ReactNode } from 'react';
import { createProjectStore, type ProjectStoreApi } from './projectStore';

interface Props {
  children: ReactNode;
}

export const ProjectStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<ProjectStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createProjectStore();
  }

  return (
    <ProjectStoreContext.Provider value={storeRef.current}>
      {children}
    </ProjectStoreContext.Provider>
  );
};
