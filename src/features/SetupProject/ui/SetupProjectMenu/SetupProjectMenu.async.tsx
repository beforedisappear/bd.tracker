import dynamic from 'next/dynamic';
import { SetupProjectMenuTrigger } from '../SetupProjectMenuTrigger/SetupProjectMenuTrigger';

export const LazySetupProjectMenu = dynamic(
  () => import('./SetupProjectMenu').then(mod => mod.SetupProjectMenu),
  { ssr: false, loading: () => <SetupProjectMenuTrigger /> },
);
