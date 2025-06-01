import { ManageProjectMembersContentLoading } from './ManageProjectMembersContent.loading';
import { ManageProjectMembersForm } from '../ManageProjectMembersForm/ManageProjectMembersForm';
import { ErrorBoundary } from '@/shared/ui/c';

import { getCurrentTeamProjectId, projectQueries } from '@/entities/Project';
import { teamQueries } from '@/entities/Team';

import { useTenant } from '@/shared/lib/navigation/useTenant';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';
import { useQuery } from '@tanstack/react-query';
import { mapTeamMembersToProjectMembers } from '../../lib/mapTeamMembersToProjectMembers';

export function ManageProjectMembersContent() {
  const tenant = useTenant();
  const { currentProjectId } = usePrivateGlobalStore(getCurrentTeamProjectId());

  const {
    data: projectMembers,
    isLoading: isProjectMembersLoading,
    isError: isProjectMembersError,
    error: projectMembersError,
    refetch: refetchProjectMembers,
  } = useQuery({
    ...projectQueries.getProjectMembers({
      projectId: currentProjectId as string,
    }),
    enabled: !!currentProjectId,
  });

  const {
    data: teamMembers,
    isLoading: isTeamMembersLoading,
    isError: isTeamMembersError,
    error: teamMembersError,
    refetch: refetchTeamMembers,
  } = useQuery({
    ...teamQueries.getTeamMembers({
      idOrSlug: tenant,
    }),
  });

  if (isProjectMembersLoading || isTeamMembersLoading) {
    return <ManageProjectMembersContentLoading />;
  } else if (isProjectMembersError || !projectMembers) {
    return (
      <ErrorBoundary
        error={projectMembersError}
        className='m-auto'
        reset={refetchProjectMembers}
      />
    );
  } else if (isTeamMembersError || !teamMembers) {
    return (
      <ErrorBoundary
        error={teamMembersError}
        className='m-auto'
        reset={refetchTeamMembers}
      />
    );
  }

  return (
    <ManageProjectMembersForm
      data={mapTeamMembersToProjectMembers(teamMembers, projectMembers)}
    />
  );
}
