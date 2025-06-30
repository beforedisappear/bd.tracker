// lib/ws.ts
import http from 'http';
import { WebSocketServer } from 'ws';
import { wsManager } from './wsManager.ts';

let wss: WebSocketServer | null = null;

export function initWebSocketServer(server: http.Server) {
  if (wss) return wss;

  wss = new WebSocketServer({ server });

  wss.on('connection', ws => {
    ws.on('message', msg => wsManager.handleMessage(ws, msg));
    ws.on('close', () => wsManager.cleanupClient(ws));
  });

  return wss;
}
