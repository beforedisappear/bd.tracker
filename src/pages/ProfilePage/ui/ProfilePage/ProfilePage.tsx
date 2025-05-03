'use client';

import { apiClient } from '@/shared/api/c';
import { useQuery } from '@tanstack/react-query';

interface Props {}

export function ProfilePage({}: Props) {
  const { data } = useQuery({
    queryKey: ['user'],
    select: data => data.data,
    queryFn: () => apiClient.withAuth.get('/profile'),
  });

  console.log('data', data);

  return (
    <div className='flex flex-col'>
      <span>ProfilePage</span>
      <span>{data?.name}</span>
    </div>
  );
}
