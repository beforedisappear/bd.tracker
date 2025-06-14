import dynamic from 'next/dynamic';
import { ManageStickersContentLoading } from './ManageStickersContent.loading';

export const LazyManageStickersContent = dynamic(
  () =>
    import('./ManageStickersContent').then(mod => ({
      default: mod.ManageStickersContent,
    })),
  { ssr: false, loading: () => <ManageStickersContentLoading /> },
);
