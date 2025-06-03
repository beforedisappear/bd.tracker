'use client';

import { createContext } from 'react';

import type { ProjectStoreApi } from './projectStore';

export const ProjectStoreContext = createContext<ProjectStoreApi | undefined>(
  undefined,
);
