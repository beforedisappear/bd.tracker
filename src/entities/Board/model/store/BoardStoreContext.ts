'use client';

import { createContext } from 'react';

import type { BoardStoreApi } from './boardStore';

export const BoardStoreContext = createContext<BoardStoreApi | undefined>(
  undefined,
);
