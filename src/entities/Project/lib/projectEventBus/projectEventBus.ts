import { EventBus } from '@/shared/lib/eventBus';

import type { ProjectEventBusEvents } from './types';

export const projectEventBus = new EventBus<ProjectEventBusEvents>();
