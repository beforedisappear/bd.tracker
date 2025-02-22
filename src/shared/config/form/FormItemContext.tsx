import type { FormItemContextValue } from './types';
import { createContext } from 'react';

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);
