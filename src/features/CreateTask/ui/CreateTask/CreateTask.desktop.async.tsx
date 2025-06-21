import dynamic from 'next/dynamic';

export const LazyCreateTaskDesktop = dynamic(
  () => import('./CreateTask.desktop').then(mod => mod.CreateTaskDesktop),
  { ssr: false },
);
