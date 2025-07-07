'use client';

import { createContext } from 'react';
import type { SocketContextType } from './types';

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined,
);
