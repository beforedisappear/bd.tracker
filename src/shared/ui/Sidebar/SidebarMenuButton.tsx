import { cn } from "@/shared/lib/css";
import { sidebarMenuButtonVariants } from "./Sidebar.utils";
import { forwardRef } from "react";
import { VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

export const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    return button;
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";
