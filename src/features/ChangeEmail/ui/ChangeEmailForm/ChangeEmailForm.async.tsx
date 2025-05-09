import dynamic from 'next/dynamic';

import { ChangeEmailFormLoading } from './ChangeEmailForm.loading';

export const LazyChangeEmailForm = dynamic(
  () => import('./ChangeEmailForm').then(mod => mod.ChangeEmailForm),
  {
    ssr: false,
    loading: () => <ChangeEmailFormLoading />,
  },
);
