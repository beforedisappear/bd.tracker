import {
  BriefcaseBusiness,
  UserRound,
  Folder,
  MessageSquare,
} from 'lucide-react';

import { Logout } from '@/features/Logout';
import { SelectTeamQuick } from '@/features/SelectTeam';
import {
  getTeamRoutePath,
  getProfileRoutePath,
  getProjectByIdRoutePath,
} from '@/shared/config/routes';

import type { SidebarGroupEl } from '@/shared/ui/c';

export const getMainSidebarGroupItems = (
  tenant: string,
  pathname: string,
): SidebarGroupEl[] => {
  const profileRoute = getProfileRoutePath(tenant);
  const teamRoute = getTeamRoutePath(tenant);

  return [
    {
      type: 'group' as const,
      items: [
        {
          type: 'item-link' as const,
          link: {
            title: 'Мой профиль',
            url: profileRoute,
            icon: <UserRound />,
            isActive: profileRoute === pathname,
          },
        },
        {
          type: 'item-link' as const,
          link: {
            title: 'Моя команда',
            url: teamRoute,
            icon: <BriefcaseBusiness />,
            isActive: teamRoute === pathname,
          },
        },
        {
          type: 'item-sub' as const,
          trigger: {
            label: 'Мои проекты',
            icon: <Folder />,
          },
          isDefaultOpen: true,
          subItems: [
            {
              type: 'item-link',
              link: {
                title: 'Проект №1',
                url: getProjectByIdRoutePath(tenant, '1'),
              },
            },
            {
              type: 'item-link',
              link: {
                title: 'Проект №2',
                url: getProjectByIdRoutePath(tenant, '2'),
              },
            },
          ],
        },
        {
          type: 'item-sub' as const,
          trigger: {
            label: 'Личные чаты',
            icon: <MessageSquare />,
          },
          isDefaultOpen: true,
          subItems: [
            { type: 'item-link', link: { title: 'Чат №1', url: '#' } },
            { type: 'item-link', link: { title: 'Чат №2', url: '#' } },
          ],
        },
      ],
    },
  ];
};

export const getSideBarFooterItems = (): React.ReactNode[] => {
  return [
    <SelectTeamQuick key='sb-select-team' />,
    <Logout key='sb-logout' btnVariant={null} className='justify-start' />,
  ];
};
