'use client';

import dynamic from 'next/dynamic';
import { CreateBoardTrigger } from '../CreateBoardTrigger/CreateBoardTrigger';

export const LazyCreateBoardDesktop = dynamic(
  () => import('./CreateBoard.desktop').then(mod => mod.CreateBoardDesktop),
  { ssr: false, loading: () => <CreateBoardTrigger disabled /> },
);
