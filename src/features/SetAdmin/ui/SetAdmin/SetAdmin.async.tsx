import dynamic from 'next/dynamic';

import { SetAdminTrigger } from '../SetAdminTrigger/SetAdminTrigger';

export const LazySetAdmin = dynamic(
  () => import('./SetAdmin').then(mod => mod.SetAdmin),
  { ssr: false, loading: () => <SetAdminTrigger /> },
);
