import dynamic from 'next/dynamic';

import { DeleteProjectFormLoading } from './DeleteProjectForm.loading';

export const LazyDeleteProjectForm = dynamic(
  () => import('./DeleteProjectForm').then(mod => mod.DeleteProjectForm),
  { ssr: false, loading: () => <DeleteProjectFormLoading /> },
);
