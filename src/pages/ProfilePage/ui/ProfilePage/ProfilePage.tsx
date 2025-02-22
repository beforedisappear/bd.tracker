'use client';

import { Logout } from '@/features/Logout';
import { apiClient } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

interface Props {}

export function ProfilePage({}: Props) {
  const {} = useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient.withAuth.get('/profile'),
  });

  return (
    <div>
      <span>ProfilePage</span>

      <Logout />
    </div>
  );
}
