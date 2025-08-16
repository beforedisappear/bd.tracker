import { Slot as SlotPrimitive } from '@radix-ui/react-slot';

import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof SlotPrimitive> & {
  [key: string]: unknown;
};

export function Slot(props: Props) {
  const { children, ...rest } = props;

  return <SlotPrimitive {...rest}>{children}</SlotPrimitive>;
}
