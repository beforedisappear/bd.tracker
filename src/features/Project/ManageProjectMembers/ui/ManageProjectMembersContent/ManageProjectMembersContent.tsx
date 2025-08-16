import { ErrorBoundary, Slot } from '@/shared/ui/c';
import { ManageProjectMembersContentLoading } from './ManageProjectMembersContent.loading';

import { useTenant } from '@/shared/lib/navigation/useTenant';
import { useQuery } from '@tanstack/react-query';

import { projectQueries } from '@/entities/Project';
import { teamQueries } from '@/entities/Team';

import { mapTeamMembersToProjectMembers } from '../../lib/mapTeamMembersToProjectMembers';

interface Props {
  children: React.ReactNode;
  projectId: string | null;
}

export function ManageProjectMembersContent(props: Props) {
  const { children, projectId } = props;

  const tenant = useTenant();

  const {
    data: projectMembers = [],
    isFetching: isProjectMembersFetching,
    isError: isProjectMembersError,
    error: projectMembersError,
    refetch: refetchProjectMembers,
  } = useQuery({
    ...projectQueries.getProjectMembers({ projectId: projectId! }),
    enabled: !!projectId,
  });

  const {
    data: teamMembers = [],
    isFetching: isTeamMembersFetching,
    isError: isTeamMembersError,
    error: teamMembersError,
    refetch: refetchTeamMembers,
  } = useQuery(
    teamQueries.getTeamMembers({
      idOrSlug: tenant,
    }),
  );

  if (isProjectMembersFetching || isTeamMembersFetching)
    return <ManageProjectMembersContentLoading />;
  else if (isTeamMembersError || isProjectMembersError)
    return (
      <ErrorBoundary
        error={isTeamMembersError ? teamMembersError : projectMembersError}
        className='m-auto'
        reset={isTeamMembersError ? refetchTeamMembers : refetchProjectMembers}
      />
    );

  return (
    <Slot
      projectId={projectId}
      data={mapTeamMembersToProjectMembers(teamMembers, projectMembers)}
    >
      {children}
    </Slot>
  );
}
