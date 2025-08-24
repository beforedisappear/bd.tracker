'use client';

import { useQuery } from '@tanstack/react-query';
import { useTeamAccess } from '@/entities/Team';

import { projectQueries } from '@/entities/Project';
import { getProjectByIdRoutePath } from '@/shared/config/routes';

export const useMainSidebarProjects = (tenant: string) => {
  const { userId, isLoading: isTeamAccessLoading } = useTeamAccess();

  const { data: projects, isLoading: isProjectsLoading } = useQuery(
    projectQueries.getProjectsByTeam({ teamIdOrSlug: tenant }),
  );

  if (isProjectsLoading || isTeamAccessLoading) {
    return new Array(5).fill('_').map(() => ({
      type: 'skeleton' as const,
    }));
  }

  const projectsItems = projects?.map(project => ({
    type: 'item-link' as const,
    link: {
      title: project.name,
      url: getProjectByIdRoutePath(tenant, project.id, project.firstBoardId),
      isDisabled: !project.members.some(member => member.id === userId),
    },
  }));

  return projectsItems ?? [];
};
