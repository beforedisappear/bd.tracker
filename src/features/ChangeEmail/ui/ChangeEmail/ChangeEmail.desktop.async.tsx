import dynamic from 'next/dynamic';
import { ChangeEmailTrigger } from '../ChangeEmailTrigger/ChangeEmailTrigger';

export const LazyChangeEmailFormDesktop = dynamic(
  () => import('./ChangeEmail.desktop').then(mod => mod.ChangeEmailDesktop),
  { ssr: false, loading: () => <ChangeEmailTrigger /> },
);
