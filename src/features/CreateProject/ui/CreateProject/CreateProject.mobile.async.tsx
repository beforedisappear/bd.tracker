import dynamic from 'next/dynamic';

export const LazyCreateProjectMobile = dynamic(
  () => import('./CreateProject.mobile').then(mod => mod.CreateProject),
  { ssr: false },
);
