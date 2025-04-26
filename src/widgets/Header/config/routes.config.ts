import { getMainRoutePath } from '@/shared/config/routes';

export const routes = [
  {
    id: 1,
    href: `${getMainRoutePath()}#features`,
    label: 'Возможности',
  },
  {
    id: 2,
    href: `${getMainRoutePath()}#testimonials`,
    label: 'Рекомендации',
  },
  {
    id: 3,
    href: `${getMainRoutePath()}#faq`,
    label: 'Частые вопросы',
  },
];
