import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from '@/shared/ui/c';

export function getLayoutWidth(isSidebarOpen: boolean, isMobile: boolean) {
  if (isMobile) return '100vw';

  const width = isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON;

  return `calc(100vw - ${width})`;
}
