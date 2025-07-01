import dynamic from 'next/dynamic';
import { CreateColumnTrigger } from '../CreateColumnTrigger/CreateColumnTrigger';

export const LazyCreateColumnMobile = dynamic(
  () => import('./CreateColumn.mobile').then(mod => mod.CreateColumnMobile),
  { ssr: false, loading: () => <CreateColumnTrigger disabled /> },
);
