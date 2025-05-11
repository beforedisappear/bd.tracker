'use client';

import { Card } from '@/shared/ui/s';
import { UserForm, userQueries } from '@/entities/User';
import { ChangeEmail } from '@/features/ChangeEmail';
import { ProfileLoading } from './Profile.loading';
import { ProfileError } from './Profile.error';

import { useQuery } from '@tanstack/react-query';

import { getProfileBlockClassName } from '../../config';

export function Profile() {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(userQueries.getUser());

  if (isLoading) return <ProfileLoading />;
  else if (isError || !user)
    return <ProfileError error={error} refetch={refetch} />;

  return (
    <Card
      title='Профиль'
      titleClassName='text-xl font-bold'
      className={getProfileBlockClassName()}
      contentClassName='flex flex-col gap-4'
    >
      <UserForm user={user} className='max-w-60' />
      <ChangeEmail email={user.email} />
    </Card>
  );
}
