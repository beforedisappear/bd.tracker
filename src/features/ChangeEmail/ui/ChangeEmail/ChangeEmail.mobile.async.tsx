import dynamic from 'next/dynamic';
import { ChangeEmailTrigger } from '../ChangeEmailTrigger/ChangeEmailTrigger';

export const LazyChangeEmailFormMobile = dynamic(
  () => import('./ChangeEmail.mobile').then(mod => mod.ChangeEmailMobile),
  { ssr: false, loading: () => <ChangeEmailTrigger /> },
);
