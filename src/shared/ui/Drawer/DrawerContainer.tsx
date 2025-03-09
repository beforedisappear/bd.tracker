import { Drawer as DrawerPrimitive } from 'vaul';

export const DrawerContainer = ({
  shouldScaleBackground = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
DrawerContainer.displayName = 'Drawer';
