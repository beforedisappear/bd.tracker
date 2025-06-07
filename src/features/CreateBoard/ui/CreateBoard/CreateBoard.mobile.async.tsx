'use client';

import dynamic from 'next/dynamic';
import { CreateBoardTrigger } from '../CreateBoardTrigger/CreateBoardTrigger';

export const LazyCreateBoardMobile = dynamic(
  () => import('./CreateBoard.mobile').then(mod => mod.CreateBoardMobile),
  { ssr: false, loading: () => <CreateBoardTrigger /> },
);
