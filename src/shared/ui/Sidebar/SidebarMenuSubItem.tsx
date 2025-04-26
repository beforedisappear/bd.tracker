import { forwardRef, type ComponentProps } from 'react';

export const SidebarMenuSubItem = forwardRef<
  HTMLLIElement,
  ComponentProps<'li'>
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';
