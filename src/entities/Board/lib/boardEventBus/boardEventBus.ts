import { EventBus } from '@/shared/lib/eventBus';

import type { BoardEventBusEvents } from './types';

export const boardEventBus = new EventBus<BoardEventBusEvents>();
