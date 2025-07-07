import { SocketProvider } from '@/shared/lib/websocket';
import { TeamSocketHandler } from '@/entities/Team';

interface Props {
  children: React.ReactNode;
}

export function MainSocketProvider(props: Props) {
  const { children } = props;

  return (
    <SocketProvider url={process.env.NEXT_PUBLIC_SOCKET_URL!}>
      {children}

      <TeamSocketHandler />
    </SocketProvider>
  );
}
