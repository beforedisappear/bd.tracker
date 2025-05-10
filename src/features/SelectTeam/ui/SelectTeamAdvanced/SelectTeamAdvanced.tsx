'use client';

import { ErrorBoundary } from '@/shared/ui/c';
import { SelectTeamAdvancedItem } from '../SelectTeamAdvancedItem/SelectTeamAdvancedItem';
import { SelectTeamAdvancedLoading } from './SelectTeamAdvanced.loading';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { teamQueries } from '@/entities/Team';

interface Props {
  onDelete?: (id: string) => void;
}

export function SelectTeamAdvanced(props: Props) {
  const { onDelete } = props;

  const { tenant } = useParams<{ tenant: string }>()!;

  const {
    data: userTeamList,
    isLoading,
    isError,
    error,
  } = useQuery(teamQueries.getUserTeamList());

  if (isLoading) return <SelectTeamAdvancedLoading />;
  else if (isError) return <ErrorBoundary error={error} />;

  return (
    <div className='flex flex-col gap-2'>
      {userTeamList?.map(team => (
        <SelectTeamAdvancedItem
          key={team.id}
          team={team}
          isCurrentTeam={team.slug === tenant}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
