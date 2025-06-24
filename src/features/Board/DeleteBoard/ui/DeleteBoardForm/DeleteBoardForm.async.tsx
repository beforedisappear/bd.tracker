import dynamic from 'next/dynamic';

import { DeleteBoardFormLoading } from './DeleteBoardForm.loading';

export const LazyDeleteBoardForm = dynamic(
  () => import('./DeleteBoardForm').then(mod => mod.DeleteBoardForm),
  { ssr: false, loading: () => <DeleteBoardFormLoading /> },
);
