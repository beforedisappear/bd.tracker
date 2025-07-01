type BoardAction = 'BOARD_CREATED' | 'BOARD_DELETED' | 'BOARD_UPDATED';

type ColumnAction =
  | 'COLUMN_CREATED'
  | 'COLUMN_DELETED'
  | 'COLUMN_UPDATED'
  | 'COLUMN_MOVED';

type TaskAction =
  | 'TASK_CREATED'
  | 'TASK_DELETED'
  | 'TASK_UPDATED'
  | 'TASK_MOVED';

type StickerAction = 'STICKER_CREATED' | 'STICKER_DELETED' | 'STICKER_UPDATED';

type ChatAction = '';

export type MessageAction =
  | BoardAction
  | ColumnAction
  | TaskAction
  | StickerAction
  | ChatAction;

export type ServerMessage<T extends object> = {
  type: 'message';
  tenantId: string;
  initiatorId: string;
  action: MessageAction;
  data: T;
};
