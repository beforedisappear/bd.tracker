import dynamic from 'next/dynamic';
import { DeleteColumnFormLoading } from './DeleteColumnForm.loading';

export const LazyDeleteColumnForm = dynamic(
  () => import('./DeleteColumnForm').then(mod => mod.DeleteColumnForm),
  { ssr: false, loading: () => <DeleteColumnFormLoading /> },
);
