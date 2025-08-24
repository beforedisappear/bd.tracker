'use client';

import { useEvent } from '@/shared/lib/eventBus';
import { boardEventBus } from './boardEventBus';

import type { BoardEventBusEvents } from './types';

export function useBoardEvent(
  event: keyof BoardEventBusEvents,
  callback: (data: BoardEventBusEvents[keyof BoardEventBusEvents]) => void,
) {
  return useEvent(boardEventBus, event, callback);
}
