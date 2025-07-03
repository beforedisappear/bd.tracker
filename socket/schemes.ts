import { z } from 'zod';

const action = [
  'BOARD_CREATED',
  'BOARD_DELETED',
  'BOARD_UPDATED',
  'COLUMN_CREATED',
  'COLUMN_DELETED',
  'COLUMN_UPDATED',
  'COLUMN_MOVED',
  'TASK_CREATED',
  'TASK_DELETED',
  'TASK_UPDATED',
  'TASK_MOVED',
  'STICKER_CREATED',
  'STICKER_DELETED',
  'STICKER_UPDATED',
] as const;

const BaseSchema = z.object({
  tenantId: z.string().uuid(),
  initiatorId: z.string().uuid(),
});

export const SubscribeMessageSchema = z
  .object({
    type: z.literal('subscribe'),
  })
  .merge(BaseSchema);

export const MessageFromServerSchema = z
  .object({
    type: z.literal('message'),
    action: z.enum(action),
    data: z.any(),
  })
  .merge(BaseSchema);

export const UnsubscribeMessageSchema = z
  .object({
    type: z.literal('unsubscribe'),
  })
  .merge(BaseSchema);

export const ErrorMessageSchema = z.object({
  type: z.literal('error'),
  message: z.string(),
});

export const ClientMessageSchema = z.discriminatedUnion('type', [
  SubscribeMessageSchema,
  UnsubscribeMessageSchema,
]);

export const ServerMessageSchema = z.discriminatedUnion('type', [
  MessageFromServerSchema,
]);
