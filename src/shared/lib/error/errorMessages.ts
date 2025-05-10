import type { CodeError } from '$/errors/apiError';

export const errorMessagesMap: { [key: string]: string } = {
  '1004': 'Неправильный или истекший код',
  '1010': 'E-mail уже занят',
  '1020': 'Команда с таким именем уже существует',
  '1021': 'Количество команд превышено',
  '1022': 'Количество команд не может быть меньше 1',
} satisfies Partial<{ [Key in CodeError]: string }>;
