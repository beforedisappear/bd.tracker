import dynamic from 'next/dynamic';

export const LazyManageStickersMobile = dynamic(
  () =>
    import('./ManageStickers.mobile').then(mod => ({
      default: mod.ManageStickersMobile,
    })),
  { ssr: false },
);
