import dynamic from 'next/dynamic';
import { CreateColumnTrigger } from '../CreateColumnTrigger/CreateColumnTrigger';

export const LazyCreateColumnDesktop = dynamic(
  () => import('./CreateColumn.desktop').then(mod => mod.CreateColumnDesktop),
  { ssr: false, loading: () => <CreateColumnTrigger /> },
);
