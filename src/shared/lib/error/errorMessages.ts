import type { CodeError } from '$/errors/apiError';

export const errorMessagesMap: { [key: string]: string } = {
  '1004': 'Неправильный или истекший код',
} satisfies Partial<{ [Key in CodeError]: string }>;
