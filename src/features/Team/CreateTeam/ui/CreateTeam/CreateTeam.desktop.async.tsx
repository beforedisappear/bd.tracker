'use client';

import dynamic from 'next/dynamic';
import { CreateTeamTrigger } from '../CreateTeamTrigger/CreateTeamTrigger';

export const LazyCreateTeamDesktop = dynamic(
  () => import('./CreateTeam.desktop').then(mod => mod.CreateTeamDesktop),
  { ssr: false, loading: () => <CreateTeamTrigger /> },
);
