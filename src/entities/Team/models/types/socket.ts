export type SubscribeSocketAction = {
  type: 'subscribe';
  tenantId: string;
  initiatorId: string;
};

export type UnsubscribeSocketAction = {
  type: 'unsubscribe';
  tenantId: string;
  initiatorId: string;
};
