import dynamic from 'next/dynamic';

export const LazyManageStickersDesktop = dynamic(
  () =>
    import('./ManageStickers.desktop').then(mod => ({
      default: mod.ManageStickersDesktop,
    })),
  { ssr: false },
);
