import dynamic from 'next/dynamic';

import { CreateBoardFormLoading } from './CreateBoardForm.loading';

export const LazyCreateBoardForm = dynamic(
  () => import('./CreateBoardForm').then(mod => mod.CreateBoardForm),
  { ssr: false, loading: () => <CreateBoardFormLoading /> },
);
