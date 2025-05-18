'use client';

import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/entities/Project';
import { getProjectByIdRoutePath } from '@/shared/config/routes';

export const useMainSidebarProjects = (tenant: string) => {
  const { data: projects, isLoading } = useQuery(
    projectQueries.getProjectsByTeam({ teamIdOrSlug: tenant }),
  );

  if (isLoading) {
    return new Array(5).fill('_').map(() => ({
      type: 'skeleton' as const,
    }));
  }

  const projectsItems = projects?.map(project => ({
    type: 'item-link' as const,
    link: {
      title: project.name,
      url: getProjectByIdRoutePath(tenant, project.id),
    },
  }));

  return projectsItems ?? [];
};
