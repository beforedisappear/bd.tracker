'use client';

import { teamQueries } from '@/entities/Team';
import { useQuery } from '@tanstack/react-query';

import { Card } from '@/shared/ui/s';
import { ErrorBoundary, ScrollArea } from '@/shared/ui/c';
import { SelectTeamItem } from '../SelectTeamItem/SelectTeamItem';
import { SelectTeamItemLoading } from '../SelectTeamItem/SelectTeamItem.loading';
import { SelectTeamPlaceholder } from './SelectTeam.placeholder';

import type { ReactNode } from 'react';

interface Props {
  actionSlot?: ReactNode;
}

export function SelectTeam({ actionSlot }: Props) {
  const {
    data: userTeamList,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery(teamQueries.getUserTeamList());

  if (isError) return <ErrorBoundary error={error} reset={refetch} />;

  return (
    <Card
      title='Выберите команду'
      className='h-auto p-2 w-full max-w-[400px]'
      headerClassName='text-xl text-center'
      contentClassName='flex flex-col'
    >
      <ScrollArea type='always' className='h-48 -mr-4'>
        <div className='flex flex-col gap-y-3 pr-4'>
          {isSuccess &&
            userTeamList.map(el => <SelectTeamItem key={el.id} data={el} />)}

          {isSuccess && userTeamList.length === 0 && <SelectTeamPlaceholder />}

          {isLoading &&
            new Array(3)
              .fill('_')
              .map((_, i) => <SelectTeamItemLoading key={i} />)}
        </div>
      </ScrollArea>

      {actionSlot}
    </Card>
  );
}
