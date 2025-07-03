import type { RawData, WebSocket } from 'ws';
import { ClientMessageSchema, ServerMessageSchema } from './schemes.ts';

export class WsManager {
  private clientWs: Map<string, WebSocket> = new Map();
  private tenantClients: Map<string, Set<string>> = new Map();
  private clientTenants: Map<string, Set<string>> = new Map();

  handleClientMessage(ws: WebSocket, msg: RawData) {
    try {
      const { type, tenantId, initiatorId } = ClientMessageSchema.parse(
        JSON.parse(msg.toString()),
      );

      if (type === 'subscribe') {
        return this.subscribe(ws, { tenantId, id: initiatorId });
      }

      if (type === 'unsubscribe') {
        return this.unsubscribe({ tenantId, id: initiatorId });
      }

      return null;
    } catch (e) {
      console.error(e);

      const baseMessage = {
        type: 'error',
        message: 'Invalid message',
      };

      ws.send(JSON.stringify(baseMessage));
    }
  }

  handleServerMessage(msg: string) {
    try {
      const { tenantId, initiatorId } = ServerMessageSchema.parse(
        JSON.parse(msg),
      );

      this.broadcastToTenant(tenantId, initiatorId, msg);
    } catch (e) {
      console.error('Invalid message', e);
    }
  }

  handleClientClose(ws: WebSocket) {
    const id = Array.from(this.clientWs.keys()).find(
      key => this.clientWs.get(key) === ws,
    );

    if (!id) return;

    this.cleanupClient(id);
  }

  private subscribe(ws: WebSocket, args: { tenantId: string; id: string }) {
    const { tenantId, id } = args;

    this.clientWs.set(id, ws);

    if (!this.tenantClients.has(tenantId)) {
      this.tenantClients.set(tenantId, new Set());
    }
    this.tenantClients.get(tenantId)!.add(id);

    if (!this.clientTenants.has(id)) {
      this.clientTenants.set(id, new Set());
    }
    this.clientTenants.get(id)!.add(tenantId);
  }

  private unsubscribe(args: { tenantId: string; id: string }) {
    const { tenantId, id } = args;

    this.tenantClients.get(tenantId)?.delete(id);
    if (this.tenantClients.get(tenantId)?.size === 0) {
      this.tenantClients.delete(tenantId);
    }

    this.clientTenants.get(id)?.delete(tenantId);

    if (this.clientTenants.get(id)?.size === 0) {
      this.clientTenants.delete(id);
      this.clientWs.delete(id);
    }
  }

  private broadcastToTenant(tenantId: string, id: string, message: string) {
    const clients = this.tenantClients.get(tenantId);
    if (!clients) return;

    for (const clientId of clients) {
      // if (clientId === id) continue;

      try {
        this.sendToClient(clientId, message);
      } catch (e) {
        console.error('Failed to send message to client', e);
        this.cleanupClient(clientId);
      }
    }
  }

  private cleanupClient(id: string) {
    const tenants = this.clientTenants.get(id);
    if (!tenants) return;

    for (const tenantId of tenants) {
      this.tenantClients.get(tenantId)?.delete(id);

      if (this.tenantClients.get(tenantId)?.size === 0) {
        this.tenantClients.delete(tenantId);
      }
    }

    this.clientTenants.delete(id);
    this.clientWs.delete(id);
  }

  private sendToClient(clientId: string, message: string) {
    const ws = this.clientWs.get(clientId);

    if (!ws) throw new Error('Client not found');

    if (ws.readyState !== ws.OPEN) throw new Error('Client is not open');

    ws.send(message);
  }

  // getTenantsOfClient(_ws: WebSocket, id: string): readonly string[] {
  //   return Array.from(this.clientTenants.get(id) ?? []);
  // }

  // getClientsOfTenant(tenantId: string): string[] {
  //   return Array.from(this.tenantClients.get(tenantId) ?? []);
  // }

  // hasClients(tenantId: string): boolean {
  //   return (this.tenantClients.get(tenantId)?.size ?? 0) > 0;
  // }
}

export const wsManager = new WsManager();
