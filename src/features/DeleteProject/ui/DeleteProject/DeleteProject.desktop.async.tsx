import dynamic from 'next/dynamic';

export const LazyDeleteProjectDesktop = dynamic(
  () => import('./DeleteProject.desktop').then(mod => mod.DeleteProjectDesktop),
  { ssr: false },
);
