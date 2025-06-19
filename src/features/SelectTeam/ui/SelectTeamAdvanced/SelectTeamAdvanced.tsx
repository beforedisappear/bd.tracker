'use client';

import { ErrorBoundary } from '@/shared/ui/c';
import { SelectTeamAdvancedItem } from '../SelectTeamAdvancedItem/SelectTeamAdvancedItem';
import { SelectTeamAdvancedLoading } from './SelectTeamAdvanced.loading';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';

import { teamQueries, useTeamStore } from '@/entities/Team';

interface Props {}

export function SelectTeamAdvanced(props: Props) {
  const {} = props;

  const tenant = useTenant();

  const setDeletingTeam = useTeamStore(state => state.setDeletingTeam);
  const setShowDeleteTeamModal = useTeamStore(
    state => state.setShowDeleteTeamModal,
  );

  const onDeleteTeam = useCallback((id: string, slug: string) => {
    setDeletingTeam({ id, slug });
    setShowDeleteTeamModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: userTeamList = [],
    isLoading,
    isError,
    error,
  } = useQuery(teamQueries.getUserTeamList());

  if (isLoading) return <SelectTeamAdvancedLoading />;
  else if (isError) return <ErrorBoundary error={error} />;

  return (
    <div className='flex flex-col gap-2'>
      {userTeamList.map(team => (
        <SelectTeamAdvancedItem
          key={team.id}
          team={team}
          isCurrentTeam={team.slug === tenant}
          onDeleteTeam={onDeleteTeam}
        />
      ))}
    </div>
  );
}
