'use client';

import { createContext } from 'react';
import type { FormItemContextValue } from './types';

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);
