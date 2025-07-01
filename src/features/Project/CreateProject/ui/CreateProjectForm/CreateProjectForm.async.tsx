import dynamic from 'next/dynamic';

import { CreateProjectFormLoading } from './CreateProjectForm.loading';

export const LazyCreateProjectForm = dynamic(
  () => import('./CreateProjectForm').then(mod => mod.CreateProjectForm),
  { ssr: false, loading: () => <CreateProjectFormLoading /> },
);
