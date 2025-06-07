import dynamic from 'next/dynamic';

export const LazyCreateTaskMobile = dynamic(
  () => import('./CreateTask.mobile').then(mod => mod.CreateTaskMobile),
  { ssr: false },
);
