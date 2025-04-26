import dynamic from 'next/dynamic';

export const LazyHeaderLoginBtnDesktop = dynamic(
  () =>
    import('./HeaderLoginBtn.desktop').then(mod => ({
      default: mod.HeaderLoginBtnDesktop,
    })),
  { ssr: false },
);
