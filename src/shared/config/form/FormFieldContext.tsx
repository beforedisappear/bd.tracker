import { createContext } from 'react';
import { FormFieldContextValue } from './types';

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);
