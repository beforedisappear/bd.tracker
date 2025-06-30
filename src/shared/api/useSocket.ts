import { useEffect, useRef, useState, useCallback } from 'react';

interface UseWebSocketOptions {
  url?: string;
  onMessage?: (message: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  autoReconnect?: boolean;
}

export function useSocket(args: UseWebSocketOptions) {
  const {
    url = process.env.NEXT_PUBLIC_SOCKET_URL!,
    onMessage,
    onOpen,
    onClose,
    onError,
    autoReconnect = true,
  } = args;

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    socketRef.current.onmessage = event => {
      onMessage?.(event.data);
    };

    socketRef.current.onerror = event => {
      onError?.(event);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
      onClose?.();

      if (autoReconnect) {
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      }
    };
  }, [url, autoReconnect, onMessage, onOpen, onClose, onError]);

  const sendMessage = useCallback((message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, isConnected };
}
