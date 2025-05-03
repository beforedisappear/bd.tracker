import { AppRoutes, type RoutesMetadata } from './routes.types';

export const routesMetadata: Record<AppRoutes, RoutesMetadata> = {
  // public
  [AppRoutes.MAIN]: {
    title: 'Сервис для планирования задач небольших команд',
    description:
      'Современное проектное управление. Agile-доски, корпоративный чат. Безопасное коробочное решение для управления большими проектами и бесплатная версия для начинающих проектов.',
  },
  [AppRoutes.TEAM]: {
    title: 'Моя команда',
    description: '',
  },
  [AppRoutes.LOGIN]: {
    title: 'Войти',
    description: 'Страница входа',
  },
  // private
  [AppRoutes.HOME]: {
    title: 'Добро пожаловать!',
    description: '',
  },
  [AppRoutes.PROFILE]: {
    title: 'Мой профиль',
    description: '',
  },
  [AppRoutes.PROJECT]: {
    title: '',
    description: '',
  },
  // service
  [AppRoutes.INVITE]: {
    title: '',
    description: '',
  },
  [AppRoutes.NOT_FOUND]: {
    title: 'Страница не найдена',
    description: '',
  },
};
