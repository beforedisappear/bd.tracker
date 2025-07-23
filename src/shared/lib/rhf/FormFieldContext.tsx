'use client';

import { createContext } from 'react';
import type { FormFieldContextValue } from './types';

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);
