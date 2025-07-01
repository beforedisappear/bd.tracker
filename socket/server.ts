import dotenv from 'dotenv';
import http from 'http';
import { initWebSocketServer } from './wss.ts';
import { subscribeToChannel } from '../config/redis/redisSubscriber.ts';
import { wsManager } from './wsManager.ts';

dotenv.config();

const port = Number(process.env.WS_PORT!);

const server = http.createServer();

initWebSocketServer(server);

subscribeToChannel(process.env.WS_REDIS_CHANNEL_NAME!, message => {
  wsManager.handleServerMessage(message);
});

server.listen(port, () => {
  console.log(`WebSocket server listening on port ${port}`);
});
