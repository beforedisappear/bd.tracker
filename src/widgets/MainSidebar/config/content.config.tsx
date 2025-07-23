import {
  BriefcaseBusiness,
  UserRound,
  Folder,
  // MessageSquare,
} from 'lucide-react';

import { Logout } from '@/features/Logout';
import { SelectTeamQuick } from '@/features/Team/SelectTeam';
import {
  SidebarTrigger,
  type SidebarGroupEl,
  type MenuSubItem,
} from '@/shared/ui/c';

import { getTeamRoutePath, getProfileRoutePath } from '@/shared/config/routes';

export const getMainSidebarHeaderItems = (): React.ReactNode[] => {
  return [<SidebarTrigger key='sb-trigger' className='w-fit ml-auto' />];
};

type Args = {
  tenant: string;
  pathname: string;
  projects: MenuSubItem[];
};

export const getMainSidebarGroupItems = (args: Args): SidebarGroupEl[] => {
  const { tenant, pathname, projects } = args;

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
          subItems: projects,
        },
        // {
        //   type: 'item-sub' as const,
        //   trigger: {
        //     label: 'Личные чаты',
        //     icon: <MessageSquare />,
        //   },
        //   isDefaultOpen: true,
        //   subItems: [
        //     { type: 'item-link', link: { title: 'Чат №1', url: '#' } },
        //     { type: 'item-link', link: { title: 'Чат №2', url: '#' } },
        //   ],
        // },
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
