import dynamic from 'next/dynamic';

export const LazyCreateProjectDesktop = dynamic(
  () => import('./CreateProject.desktop').then(mod => mod.CreateProject),
  { ssr: false },
);
