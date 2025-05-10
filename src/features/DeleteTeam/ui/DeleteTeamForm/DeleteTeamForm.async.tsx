import dynamic from 'next/dynamic';

export const LazyDeleteTeamForm = dynamic(
  () => import('./DeleteTeamForm').then(mod => mod.DeleteTeamForm),
  { ssr: false },
);
