import dynamic from 'next/dynamic';
import { AuthModalContentLoading } from './AuthModalContent.loding';

export const LazyAuthModalContent = dynamic(
  () => import('./AuthModalContent').then(mod => mod.AuthModalContent),
  {
    ssr: false,
    loading: () => <AuthModalContentLoading />,
  },
);
