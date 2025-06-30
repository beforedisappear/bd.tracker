import { z } from 'zod';

const action = ['Board', 'Column', 'Task', 'Sticker', 'Chat'] as const;

const BaseSchema = z.object({
  tenantId: z.string(),
});

export const SubscribeMessageSchema = z
  .object({
    type: z.literal('subscribe'),
  })
  .merge(BaseSchema);

export const SimpleMessageSchema = z
  .object({
    type: z.literal('message'),
    data: z.object({
      action: z.enum(action),
    }),
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

export const MessageSchema = z.discriminatedUnion('type', [
  SubscribeMessageSchema,
  SimpleMessageSchema,
  UnsubscribeMessageSchema,
  ErrorMessageSchema,
]);
