import type { RawData } from 'ws';
import { MessageSchema } from './schemes.ts';

export class WsManager {
  private tenantClients: Map<string, Set<WebSocket>> = new Map();
  private clientTenants: Map<WebSocket, Set<string>> = new Map();

  handleMessage(ws: WebSocket, msg: RawData) {
    try {
      const message = MessageSchema.parse(JSON.parse(msg.toString()));

      if (message.type === 'subscribe') {
        this.subscribe(ws, { tenantId: message.tenantId });
      }

      if (message.type === 'unsubscribe') {
        this.unsubscribe(ws, { tenantId: message.tenantId });
      }

      console.log('this.tenantClients', this.tenantClients);
    } catch {
      const baseMessage = {
        type: 'error',
        message: 'Invalid message',
      };

      ws.send(JSON.stringify(baseMessage));
    }
  }

  subscribe(ws: WebSocket, args: { tenantId: string }) {
    const { tenantId } = args;

    if (!this.tenantClients.has(tenantId)) {
      this.tenantClients.set(tenantId, new Set());
    }

    console.log(this.tenantClients);

    this.tenantClients.get(tenantId)!.add(ws);

    if (!this.clientTenants.has(ws)) {
      this.clientTenants.set(ws, new Set());
    }
    this.clientTenants.get(ws)!.add(tenantId);
  }

  unsubscribe(ws: WebSocket, args: { tenantId: string }) {
    const { tenantId } = args;

    this.tenantClients.get(tenantId)?.delete(ws);

    if (this.tenantClients.get(tenantId)?.size === 0) {
      this.tenantClients.delete(tenantId);
    }

    this.clientTenants.get(ws)?.delete(tenantId);

    if (this.clientTenants.get(ws)?.size === 0) {
      this.clientTenants.delete(ws);
    }
  }

  broadcastToTenant(tenantId: string, message: string) {
    const clients = this.tenantClients.get(tenantId);

    console.log(this.tenantClients, clients);

    if (!clients) return;

    const payload = JSON.stringify(message);

    for (const client of clients) {
      if (client.readyState === client.OPEN) {
        client.send(payload);
      }
    }
  }

  cleanupClient(ws: WebSocket) {
    const tenants = this.clientTenants.get(ws);
    if (!tenants) return;

    for (const tenantId of tenants) {
      this.tenantClients.get(tenantId)?.delete(ws);
      if (this.tenantClients.get(tenantId)?.size === 0) {
        this.tenantClients.delete(tenantId);
      }
    }

    this.clientTenants.delete(ws);
  }

  getTenantsOfClient(ws: WebSocket): readonly string[] {
    return Array.from(this.clientTenants.get(ws) ?? []);
  }

  getClientsOfTenant(tenantId: string): WebSocket[] {
    return Array.from(this.tenantClients.get(tenantId) ?? []);
  }

  hasClients(tenantId: string): boolean {
    return (this.tenantClients.get(tenantId)?.size ?? 0) > 0;
  }
}

export const wsManager = new WsManager();
