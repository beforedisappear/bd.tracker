import { ErrorBoundary } from '@/shared/ui/c';
import { ManageProjectsItem } from '../ManageProjectsItem/ManageProjectsItem';
import { ManageProjectsLoading } from './ManageProjects.loading';
import { ManageProjectsPlaceholder } from './ManageProjects.placeholder';

import { useTenant } from '@/shared/lib/navigation';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/shared/lib/css';
import { projectQueries } from '@/entities/Project';
import { getManageProjectsContainerClassName } from '../../constants';

export function ManageProjects() {
  const tenant = useTenant();

  const {
    data,
    isLoading: isProjectsLoading,
    isError,
    error,
    refetch,
  } = useQuery(projectQueries.getProjectsByTeam({ teamIdOrSlug: tenant }));

  if (isProjectsLoading) return <ManageProjectsLoading />;
  else if (isError || !data)
    return <ErrorBoundary error={error} className='m-auto' reset={refetch} />;

  return (
    <div className={cn(getManageProjectsContainerClassName())}>
      {data.map(project => (
        <ManageProjectsItem
          key={project.id}
          project={project}
          tenant={tenant}
        />
      ))}

      {data.length === 0 && <ManageProjectsPlaceholder />}
    </div>
  );
}
