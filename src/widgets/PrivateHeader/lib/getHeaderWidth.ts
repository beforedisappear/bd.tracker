import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from '@/shared/ui/c';

type Args = {
  isMobile: boolean;
  isSidebarOpen: boolean;
};

export const getHeaderWidth = (args: Args) => {
  const { isMobile, isSidebarOpen } = args;

  if (isMobile) return 'calc(100vw - 2rem)';

  const sidebarWidth = isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON;

  return `calc(100vw - ${sidebarWidth} - 2rem)`;
};
