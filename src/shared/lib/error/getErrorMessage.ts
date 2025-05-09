import { AxiosError } from 'axios';
import { errorMessagesMap } from './errorMessages';
import { ERROR_MESSAGE } from '@/shared/constants';

export const getErrorMessage = (error: unknown) => {
  let message = ERROR_MESSAGE;

  if (error instanceof AxiosError) {
    if (
      error.response?.data &&
      typeof error.response?.data === 'object' &&
      'code' in error.response.data &&
      typeof error.response.data.code === 'string'
    ) {
      message = errorMessagesMap[error.response.data.code];
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  return message;
};
