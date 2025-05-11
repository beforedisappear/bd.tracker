import { createContext } from 'react';

import type { TeamStoreApi } from './teamStore';

export const TeamStoreContext = createContext<TeamStoreApi | undefined>(
  undefined,
);
