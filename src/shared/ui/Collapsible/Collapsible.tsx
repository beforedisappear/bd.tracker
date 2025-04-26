'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import type { ComponentProps, PropsWithChildren } from 'react';

type BaseProps = ComponentProps<typeof CollapsibleContainer>;

interface Props extends PropsWithChildren, BaseProps {
  triggerEl: React.ReactNode;
  contentEl: React.ReactNode;
}

export const CollapsibleContainer = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

export const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export function Collapsible({ triggerEl, contentEl, ...restProps }: Props) {
  return (
    <CollapsibleContainer {...restProps}>
      <CollapsibleTrigger>{triggerEl}</CollapsibleTrigger>
      <CollapsibleContent>{contentEl}</CollapsibleContent>
    </CollapsibleContainer>
  );
}
