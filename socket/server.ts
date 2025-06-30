// ws-server.ts
import http from 'http';
import { initWebSocketServer } from './wss.ts';

const server = http.createServer();

initWebSocketServer(server);

server.listen(4000, () => {
  console.log('🔌 WebSocket сервер слушает на 4000');
});
