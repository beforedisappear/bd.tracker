'use client';

import { ErrorBoundary, MembersField, PureInput } from '@/shared/ui/c';
import { TeamMembersFieldLoading } from './TeamMembersField.loading';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';
import { useDebouncedValue } from '@/shared/lib/ui';

import { teamQueries } from '../../api';

interface Props {
  label?: string;
  withSearch?: boolean;
}

export function TeamMembersField(props: Props) {
  const { label, withSearch = true } = props;

  const tenant = useTenant();
  const [value, setValue] = useState('');

  const debouncedKeyword = useDebouncedValue(value, 800);

  const cacheTime = debouncedKeyword.length > 0 ? 0 : 1000 * 60;

  const {
    data: teamMembers,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    ...teamQueries.getTeamMembers({
      idOrSlug: tenant,
      keyword: debouncedKeyword,
    }),
    staleTime: cacheTime,
    gcTime: cacheTime,
  });

  return (
    <div className='flex flex-col gap-2 flex-1'>
      {label && <span className='text-sm font-medium'>{label}</span>}

      {withSearch && (
        <PureInput
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Поиск по имени или email'
        />
      )}

      <div className='flex flex-col gap-2 flex-1'>
        {isLoading && <TeamMembersFieldLoading />}

        {isError && (
          <ErrorBoundary error={error} className='m-auto' reset={refetch} />
        )}

        {isSuccess && (
          <MembersField members={teamMembers} inputName='membersIds' />
        )}
      </div>
    </div>
  );
}
