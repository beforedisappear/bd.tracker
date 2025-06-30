import { z } from 'zod';

import { SimpleMessageSchema } from './schemes.ts';

export type MessageAction = 'Board' | 'Column' | 'Task' | 'Sticker' | 'Chat';

export type SimpleMessage = z.infer<typeof SimpleMessageSchema>;
