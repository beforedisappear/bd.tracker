'use client';

import { type RefObject, useLayoutEffect } from 'react';

type Args = {
  enabled: boolean;
  ref?: RefObject<HTMLElement>;
  type?: 'all' | 'x' | 'y';
};

export function useScrollLock(args: Args) {
  const { enabled, ref, type = 'all' } = args;

  useLayoutEffect(() => {
    const element = ref?.current || document.body;
    if (!enabled) return;

    const overflowPropName = type === 'all' ? 'overflow' : `overflow-${type}`;

    const prevOverflow = element.style.getPropertyValue(overflowPropName);
    element.style.setProperty(overflowPropName, 'hidden');

    return () => {
      element.style.setProperty(overflowPropName, prevOverflow);
    };
  }, [enabled, ref, type]);

  return null;
}
