'use client';

import { ErrorBoundary } from '@/shared/ui/c';
import { TeamMembersFieldLoading } from './TeamMembersField.loading';
import { TeamMembersFieldContent } from '../TeamMembersFieldContent/TeamMembersFieldContent';

import { useQuery } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';

import { teamQueries } from '../../api';

interface Props {
  label?: string;
}

export function TeamMembersField(props: Props) {
  const { label } = props;

  const tenant = useTenant();

  const {
    data: teamMembers,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(teamQueries.getTeamMembers({ idOrSlug: tenant }));

  //TODO: add sort by keyword

  return (
    <div className='flex flex-col gap-2 flex-1'>
      {label && <span className='text-sm font-medium'>{label}</span>}

      <div className='flex flex-col gap-2 flex-1'>
        {isLoading && <TeamMembersFieldLoading />}

        {isError && (
          <ErrorBoundary error={error} className='m-auto' reset={refetch} />
        )}

        {isSuccess && <TeamMembersFieldContent members={teamMembers} />}
      </div>
    </div>
  );
}
