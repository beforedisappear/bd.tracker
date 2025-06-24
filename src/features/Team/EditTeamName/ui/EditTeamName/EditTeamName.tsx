'use client';

import { EditTeamNameField } from '../EditTeamNameField/EditTeamNameField';
import { EditTeamNamePlaceholder } from './EditTeamName.placeholder';
import { EditTeamNameLoading } from './EditTeamName.loading';

import { useQuery } from '@tanstack/react-query';
import { teamQueries } from '@/entities/Team/api/queries';
import { useTenant } from '@/shared/lib/navigation';

export function EditTeamName() {
  const tenant = useTenant();

  const { data, isLoading, isPending, isError } = useQuery(
    teamQueries.getTeamById({ idOrSlug: tenant }),
  );

  if (isLoading || isPending) return <EditTeamNameLoading />;
  else if (isError || !data) return <EditTeamNamePlaceholder />;

  return <EditTeamNameField name={data.name} />;
}
