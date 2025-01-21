import { createContext } from 'react';

import type { GlobalStoreApi } from './store';

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined,
);
