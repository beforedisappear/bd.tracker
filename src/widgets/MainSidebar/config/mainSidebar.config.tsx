import { BriefcaseBusiness, UserRound } from 'lucide-react';
import { getTeamRoute, getProfileRoute } from '@/shared/config/routes';

import type { SidebarGroupEl } from '@/shared/ui/c';

export const getMainSidebarItems = (tenant: string): SidebarGroupEl[] => [
  {
    type: 'item' as const,
    items: [
      {
        type: 'item' as const,
        link: {
          title: 'Мой профиль',
          url: getProfileRoute(tenant),
          icon: <UserRound />,
        },
      },
      {
        type: 'item' as const,
        link: {
          title: 'Моя команда',
          url: getTeamRoute(tenant),
          icon: <BriefcaseBusiness />,
        },
        subItems: [{ type: 'item', link: { title: 'Проект №1', url: '1' } }],
      },
    ],
  },
];
