'use client';

import { Skeleton } from '@/shared/ui/s';
import { SelectTeamQuickForm } from '../SelectTeamQuickForm/SelectTeamQuickForm';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { teamQueries } from '@/entities/Team';
import { selectAdapter } from '@/shared/lib/input';

interface Props {}

export function SelectTeamQuick({}: Props) {
  const { tenant } = useParams<{ tenant: string }>()!;

  const {
    data: userTeamList,
    isFetching,
    isError,
  } = useQuery(teamQueries.getUserTeamList());

  const options = useMemo(
    () =>
      selectAdapter(userTeamList ?? [], {
        labelKey: 'name',
        valueKey: 'slug',
      }),
    // to avoid empty select input value (when value !== tenant)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userTeamList?.map(t => t.id).join(','), tenant],
  );

  if (isFetching)
    return <Skeleton className='h-9 group-data-[collapsible=icon]:hidden' />;
  else if (isError || !userTeamList) return <></>;

  return (
    <SelectTeamQuickForm
      key={tenant}
      options={options}
      isFetching={isFetching}
      tenant={tenant}
    />
  );
}
