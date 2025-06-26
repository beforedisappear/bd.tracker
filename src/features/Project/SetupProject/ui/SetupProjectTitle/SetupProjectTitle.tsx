import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/entities/Project';
import { useProject, useTenant } from '@/shared/lib/navigation';
import { Skeleton } from '@/shared/ui/s';

export function SetupProjectTitle() {
  const tenant = useTenant();
  const { projectId } = useProject();

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(projectQueries.getProjectsByTeam({ teamIdOrSlug: tenant }));

  if (isLoading) return <Skeleton className='w-24 h-6' />;
  else if (isError || !projects) return null;

  const project = projects.find(project => project.id === projectId);

  return <span className='font-medium'>{`"${project?.name}"`}</span>;
}
