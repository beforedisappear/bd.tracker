'use client';

import { useTenant } from '@/shared/lib/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSocket } from '@/shared/lib/websocket';
import { useEffect, useRef } from 'react';

import { teamQueries } from '../api';

import type {
  SubscribeSocketAction,
  UnsubscribeSocketAction,
} from '../models/types/socket';

export function TeamSocketHandler() {
  const tenant = useTenant();
  const prevTenantIdRef = useRef<string>(null);
  const { socket } = useSocket();

  const { data, isSuccess } = useQuery(
    teamQueries.getHaveAccessToTeam({ idOrSlug: tenant }),
  );

  // to unsub from previous tenant
  useEffect(() => {
    if (!isSuccess || !socket) return;

    if (!prevTenantIdRef.current || prevTenantIdRef.current === data.tenantId)
      return;

    const unsubMessage: UnsubscribeSocketAction = {
      type: 'unsubscribe',
      tenantId: prevTenantIdRef.current,
      initiatorId: data.userId,
    };

    if (socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify(unsubMessage));

    prevTenantIdRef.current = data.tenantId;
  }, [isSuccess, socket, data?.tenantId, data?.userId]);

  // to sub and unsub from current tenant
  useEffect(() => {
    if (!isSuccess || !socket) return;

    const subMessage: SubscribeSocketAction = {
      type: 'subscribe',
      tenantId: data.tenantId,
      initiatorId: data.userId,
    };

    const unsubMessage: UnsubscribeSocketAction = {
      type: 'unsubscribe',
      tenantId: data.tenantId,
      initiatorId: data.userId,
    };

    const subscribe = () => {
      socket.send(JSON.stringify(subMessage));
    };

    const ac = new AbortController();

    if (socket.readyState === WebSocket.OPEN) {
      subscribe();
    } else {
      socket.addEventListener('open', subscribe, { signal: ac.signal });
    }

    const handleUnload = () => {
      if (socket.readyState !== WebSocket.OPEN) return;

      socket.send(JSON.stringify(unsubMessage));
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      ac.abort();
    };
  }, [isSuccess, socket, data?.tenantId, data?.userId]);

  return null;
}
