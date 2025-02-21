import { AxiosError } from 'axios';
import { errorMessagesMap } from './errorMessages';

export const getErrorMessage = (error: unknown) => {
  let message = 'Непредвиденная ошибка';

  if (error instanceof AxiosError) {
    if (
      error.response?.data &&
      typeof error.response?.data === 'object' &&
      'code' in error.response.data &&
      typeof error.response.data.code === 'number'
    ) {
      message = errorMessagesMap[error.response.data.code as number];
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  return message;
};
