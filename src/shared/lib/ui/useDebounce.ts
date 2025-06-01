'use client';

import { useRef } from 'react';

export function useDebounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
) {
  const ref = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => func(...args), delay);
  };
}
