'use client';

import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

import { ResizeObserver } from '@juggle/resize-observer';

function useLatest<T>(val: T) {
  const valueRef = useRef(val);

  useLayoutEffect(() => {
    valueRef.current = val;
  }, [val]);

  return valueRef;
}

export function useResizeObserver(
  elementRef: RefObject<HTMLElement | null>,
  cb: ResizeObserverCallback,
) {
  const latestCb = useLatest(cb);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new ResizeObserver((...args) => {
      latestCb.current(...args);
    });

    observer.observe(element);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestCb]);
}
