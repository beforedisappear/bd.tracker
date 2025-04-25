'use client';

import { createContext } from 'react';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextProps | null>(null);
