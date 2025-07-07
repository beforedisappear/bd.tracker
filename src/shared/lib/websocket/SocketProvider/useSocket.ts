import { useEffect, useRef, useState, use } from 'react';
import { SocketContext } from './SocketContext';

interface Args {
  onMessage?: (message: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  autoReconnect?: boolean;
}

export function useSocket(args: Args = {}) {
  const { onMessage, onOpen, onClose, onError, autoReconnect = true } = args;
  const context = use(SocketContext);

  if (!context)
    throw new Error('useSocket must be used within a SocketProvider');

  const { socket } = context;

  const [isConnected, setIsConnected] = useState(!!socket);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleOpen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    const handleClose = () => {
      setIsConnected(false);
      onClose?.();

      if (autoReconnect) {
        reconnectTimeout.current = setTimeout(() => {
          // Пересоздаём сокет через провайдер (реализация зависит от провайдера)
          // Здесь можно реализовать коллбек для пересоздания, если нужно
        }, 3000);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      onMessage?.(event.data);
    };

    const handleError = (event: Event) => {
      onError?.(event);
    };

    const ac = new AbortController();

    socket.addEventListener('open', handleOpen, { signal: ac.signal });
    socket.addEventListener('close', handleClose, { signal: ac.signal });
    socket.addEventListener('message', handleMessage, { signal: ac.signal });
    socket.addEventListener('error', handleError, { signal: ac.signal });

    return () => {
      ac.abort();

      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [socket, onMessage, onOpen, onClose, onError, autoReconnect]);

  const sendMessage = (message: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(message);
  };

  return { sendMessage, isConnected, socket };
}
