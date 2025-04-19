'use client';

import {
  ScrollAreaContainer,
  type ScrollAreaContainerProps,
} from './ScrollAreaContainer';
import type { ScrollBarProps } from './ScrollBar';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, ScrollAreaContainerProps {
  scrollBar?: ScrollBarProps;
}

export function ScrollArea(props: Props) {
  const { children, ...restProps } = props;

  return <ScrollAreaContainer {...restProps}>{children}</ScrollAreaContainer>;
}
