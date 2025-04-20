"use client";

import { cn } from "@/shared/lib/css";
import { ComponentRef, forwardRef, type ComponentProps } from "react";
import { Button } from "../c";
import { useSidebar } from "./Sidebar.state";
import { PanelLeft } from "lucide-react";

export const SidebarTrigger = forwardRef<
  ComponentRef<typeof Button>,
  ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
