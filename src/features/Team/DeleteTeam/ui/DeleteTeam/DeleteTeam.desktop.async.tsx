'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/shared/lib/css';

import { DeleteTeamTrigger } from '../DeleteTeamTrigger/DeleteTeamTrigger';

export const LazyDeleteTeamDesktop = dynamic(
  () => import('./DeleteTeam.desktop').then(mod => mod.DeleteTeamDesktop),
  {
    ssr: false,
    loading: args => (
      <DeleteTeamTrigger className={cn({ hidden: args.isLoading })} />
    ),
  },
);
