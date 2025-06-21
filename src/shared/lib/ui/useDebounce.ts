'use client';

import { useRef } from 'react';

export function useDebounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
) {
  const ref = useRef<NodeJS.Timeout | null>(null);

  return (...args: Args) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => func(...args), delay);
  };
}
