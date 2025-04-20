import { getMainRoute } from '@/shared/config/routes';

export const routes = [
  {
    id: 1,
    href: `${getMainRoute()}#features`,
    label: 'Возможности',
  },
  {
    id: 2,
    href: `${getMainRoute()}#testimonials`,
    label: 'Рекомендации',
  },
  {
    id: 3,
    href: `${getMainRoute()}#faq`,
    label: 'Частые вопросы',
  },
];
