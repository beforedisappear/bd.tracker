import dynamic from 'next/dynamic';
import { CreateColumnFormLoading } from './CreateColumnForm.loading';

export const LazyCreateColumnForm = dynamic(
  () => import('./CreateColumnForm').then(mod => mod.CreateColumnForm),
  { ssr: false, loading: () => <CreateColumnFormLoading /> },
);
