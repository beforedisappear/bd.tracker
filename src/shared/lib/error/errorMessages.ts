import type { CodeError } from '$/errors/apiError';

export const errorMessagesMap: { [key: string]: string } = {
  '1004': 'Неправильный или истекший код',
  '1010': 'E-mail уже занят',
} satisfies Partial<{ [Key in CodeError]: string }>;
