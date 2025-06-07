'use client';

import { Skeleton } from '@/shared/ui/s';
import { SelectTeamQuickForm } from '../SelectTeamQuickForm/SelectTeamQuickForm';

import { useQuery } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';

import { teamQueries } from '@/entities/Team';
import { selectAdapter } from '@/shared/lib/input';

interface Props {}

export function SelectTeamQuick({}: Props) {
  const tenant = useTenant();

  const {
    data: userTeamList,
    isFetching,
    isError,
  } = useQuery(teamQueries.getUserTeamList());

  const options = selectAdapter(userTeamList ?? [], {
    labelKey: 'name',
    valueKey: 'slug',
  });

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
