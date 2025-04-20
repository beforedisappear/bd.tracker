import { cn } from "@/shared/lib/css";
import { Separator } from "../Separator/Separator";
import { forwardRef, type ComponentProps, type ComponentRef } from "react";

export const SidebarSeparator = forwardRef<
  ComponentRef<typeof Separator>,
  ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
