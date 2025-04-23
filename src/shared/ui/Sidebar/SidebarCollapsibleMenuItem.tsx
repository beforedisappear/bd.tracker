import {
  CollapsibleContainer,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../Collapsible/Collapsible';
import { SidebarMenuItem } from './SidebarMenuItem';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  trigger: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarCollapsibleMenuItem(props: Props) {
  const { children, trigger, defaultOpen = false } = props;

  return (
    <CollapsibleContainer
      defaultOpen={defaultOpen}
      className='group/collapsible'
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </SidebarMenuItem>
    </CollapsibleContainer>
  );
}

/* <SidebarMenu>
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem />
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
</SidebarMenu> */
