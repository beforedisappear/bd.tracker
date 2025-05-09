'use client';

import dynamic from 'next/dynamic';
import { CreateTeamTrigger } from '../CreateTeamTrigger/CreateTeamTrigger';

export const LazyCreateTeamMobile = dynamic(
  () => import('./CreateTeam.mobile').then(mod => mod.CreateTeamMobile),
  { ssr: false, loading: () => <CreateTeamTrigger /> },
);
