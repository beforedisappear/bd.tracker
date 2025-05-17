import { projectQueries } from '@/entities/Project';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { InviteToTeamForm } from '../InviteToTeamForm/InviteToTeamForm';
import { InviteToTeamContentLoading } from './InviteToTeamContent.loading';

interface Props {
  onClose?: () => void;
  className?: string;
  submitButtonClassName?: string;
}

export function InviteToTeamContent(props: Props) {
  const { onClose, className, submitButtonClassName } = props;
  const { tenant } = useParams<{ tenant: string }>()!;

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(projectQueries.getProjectsByTeam({ teamIdOrSlug: tenant }));

  if (isLoading) {
    return <InviteToTeamContentLoading />;
  } else if (isError || !projects) {
    return null;
  }

  return (
    <InviteToTeamForm
      projects={projects}
      onClose={onClose}
      className={className}
      submitButtonClassName={submitButtonClassName}
    />
  );
}
