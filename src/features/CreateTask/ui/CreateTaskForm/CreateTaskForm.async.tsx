import dynamic from 'next/dynamic';
import { CreateTaskFormLoading } from './CreateTaskForm.loading';

export const LazyCreateTaskForm = dynamic(
  () => import('./CreateTaskForm').then(mod => mod.CreateTaskForm),
  { ssr: false, loading: () => <CreateTaskFormLoading /> },
);
