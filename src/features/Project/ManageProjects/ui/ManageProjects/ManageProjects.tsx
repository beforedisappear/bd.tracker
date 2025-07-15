import { ErrorBoundary } from '@/shared/ui/c';
import { ManageProjectsItem } from '../ManageProjectsItem/ManageProjectsItem';
import { ManageProjectsLoading } from './ManageProjects.loading';
import { ManageProjectsPlaceholder } from './ManageProjects.placeholder';

import { useTenant } from '@/shared/lib/navigation';
import { useQuery } from '@tanstack/react-query';
import { useTeamAccess } from '@/entities/Team';

import { cn } from '@/shared/lib/css';
import { projectQueries } from '@/entities/Project';
import { getManageProjectsContainerClassName } from '../../constants';

export function ManageProjects() {
  const tenant = useTenant();
  const {
    userId,
    isEnoughAccess,
    isLoading: isTeamAccessLoading,
  } = useTeamAccess();

  const {
    data,
    isLoading: isProjectsLoading,
    isError,
    error,
    refetch,
  } = useQuery(projectQueries.getProjectsByTeam({ teamIdOrSlug: tenant }));

  if (isProjectsLoading || isTeamAccessLoading)
    return <ManageProjectsLoading />;
  else if (isError || !data || !userId)
    return <ErrorBoundary error={error} className='m-auto' reset={refetch} />;

  return (
    <div className={cn(getManageProjectsContainerClassName())}>
      {data.map(project => (
        <ManageProjectsItem
          key={project.id}
          project={project}
          tenant={tenant}
          userId={userId}
          isEnoughAccess={isEnoughAccess}
        />
      ))}

      {data.length === 0 && <ManageProjectsPlaceholder />}
    </div>
  );
}
