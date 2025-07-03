'use client';

import { useEffect, useState, ReactNode } from 'react';
import { SocketContext } from './SocketContext';

interface Props {
  url: string;
  children: ReactNode;
}

export function SocketProvider(props: Props) {
  const { url, children } = props;

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    // Очистка: закрываем сокет при размонтировании
    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        console.log('close');
        ws.close();
      }
      setSocket(null);
    };
  }, [url]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
