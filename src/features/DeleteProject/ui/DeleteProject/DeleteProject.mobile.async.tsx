import dynamic from 'next/dynamic';

export const LazyDeleteProjectMobile = dynamic(
  () => import('./DeleteProject.mobile').then(mod => mod.DeleteProjectMobile),
  { ssr: false },
);
