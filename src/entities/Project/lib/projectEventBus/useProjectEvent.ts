import { useEvent } from '@/shared/lib/eventBus';
import { projectEventBus } from './projectEventBus';

import type { ProjectEventBusEvents } from './types';

export function useProjectEvent(
  event: keyof ProjectEventBusEvents,
  callback: (data: ProjectEventBusEvents[keyof ProjectEventBusEvents]) => void,
) {
  return useEvent(projectEventBus, event, callback);
}
