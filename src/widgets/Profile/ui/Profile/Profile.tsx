'use client';

import { Card } from '@/shared/ui/s';
import { UserForm, userQueries } from '@/entities/User';
import { ErrorBoundary } from '@/shared/ui/c';
import { ProfileLoading } from './Profile.loading';

import { useQuery } from '@tanstack/react-query';

import { getProfileBlockClassName } from '../../config';

export function Profile() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(userQueries.getUser());

  if (isLoading) return <ProfileLoading />;
  else if (isError || !user) return <ErrorBoundary error={error} />;

  return (
    <Card
      title='Профиль'
      titleClassName='text-xl font-bold'
      className={getProfileBlockClassName()}
    >
      <UserForm user={user} className='max-w-60' />
    </Card>
  );
}
