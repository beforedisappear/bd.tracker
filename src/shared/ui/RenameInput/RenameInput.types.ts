import { type FocusEvent } from 'react';

export interface RenameInputMethods {
  focus: () => void;
  onStartEditing?: () => void;
  onEndEditing?: (e: FocusEvent<HTMLInputElement>) => void;
}
