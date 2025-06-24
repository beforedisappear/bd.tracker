import { ManageProjectMembersContentLoading } from './ManageProjectMembersContent.loading';
import { ManageProjectMembersForm } from '../ManageProjectMembersForm/ManageProjectMembersForm';
import { ErrorBoundary } from '@/shared/ui/c';

import { useTenant } from '@/shared/lib/navigation/useTenant';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';
import { useQuery } from '@tanstack/react-query';

import { getProjectMembersModal, projectQueries } from '@/entities/Project';
import { teamQueries } from '@/entities/Team';

import { mapTeamMembersToProjectMembers } from '../../lib/mapTeamMembersToProjectMembers';

export function ManageProjectMembersContent() {
  const tenant = useTenant();
  const { currentProjectId } = usePrivateGlobalStore(getProjectMembersModal());

  const {
    data: projectMembers = [],
    isFetching: isProjectMembersFetching,
    isError: isProjectMembersError,
    error: projectMembersError,
    refetch: refetchProjectMembers,
  } = useQuery({
    ...projectQueries.getProjectMembers({ projectId: currentProjectId! }),
    enabled: !!currentProjectId,
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
  else if (isTeamMembersError)
    return (
      <ErrorBoundary
        error={teamMembersError}
        className='m-auto'
        reset={refetchTeamMembers}
      />
    );
  else if (isProjectMembersError)
    return (
      <ErrorBoundary
        error={projectMembersError}
        className='m-auto'
        reset={refetchProjectMembers}
      />
    );

  return (
    <ManageProjectMembersForm
      projectId={currentProjectId as string}
      data={mapTeamMembersToProjectMembers(teamMembers, projectMembers)}
    />
  );
}
