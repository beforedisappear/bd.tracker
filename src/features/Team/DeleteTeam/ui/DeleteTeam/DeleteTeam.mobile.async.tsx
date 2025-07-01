'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/shared/lib/css';

import { DeleteTeamTrigger } from '../DeleteTeamTrigger/DeleteTeamTrigger';

export const LazyDeleteTeamMobile = dynamic(
  () => import('./DeleteTeam.mobile').then(mod => mod.DeleteTeamMobile),
  {
    ssr: false,
    loading: args => (
      <DeleteTeamTrigger className={cn({ hidden: args.isLoading })} />
    ),
  },
);
