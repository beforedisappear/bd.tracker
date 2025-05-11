import { createContext } from 'react';

import type { PrivateGlobalStoreApi } from './privateGlobalStore';

export const PrivateGlobalStoreContext = createContext<
  PrivateGlobalStoreApi | undefined
>(undefined);
