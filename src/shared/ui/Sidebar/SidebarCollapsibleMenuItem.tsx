import {
  CollapsibleContainer,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../Collapsible/Collapsible';
import { useSidebar } from './Sidebar.hooks';
import { SidebarMenuItem } from './SidebarMenuItem';

import { useState, type MouseEvent, type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  trigger: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarCollapsibleMenuItem(props: Props) {
  const { children, trigger, defaultOpen = false } = props;

  const { setIsSidebarOpen, isSidebarOpen } = useSidebar();
  const [openCol, setOpenCol] = useState(defaultOpen);

  const onOpenCol = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSidebarOpen(true);
    if (!openCol) setOpenCol(true);
  };

  return (
    <CollapsibleContainer
      defaultOpen={defaultOpen}
      open={openCol}
      onOpenChange={setOpenCol}
      className='group/collapsible'
    >
      <SidebarMenuItem>
        <CollapsibleTrigger
          asChild
          onClick={isSidebarOpen ? undefined : onOpenCol}
        >
          {trigger}
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </SidebarMenuItem>
    </CollapsibleContainer>
  );
}
