import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { Injectable, Logger } from '@nestjs/common';

export interface WsClientInfo {
  role?: 'ADMIN' | 'TEACHER' | 'STUDENT';
  userId?: string | number;
}

export interface WsNotificationPayload {
  id?: string;
  type: 'BROADCAST' | 'HOMEWORK' | 'EXAM' | 'COIN' | 'ADMIN_REQUEST' | 'SYSTEM';
  target: 'ALL' | 'STUDENTS' | 'TEACHERS' | 'ADMIN' | 'DEBTORS';
  title: string;
  message: string;
  channels?: string[];
  createdAt?: string;
  data?: Record<string, any>;
}

@WebSocketGateway({
  path: '/api/ws',
})
@Injectable()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotificationsGateway.name);

  @WebSocketServer()
  server!: any;

  // Track connected clients with their role/info
  private readonly clients = new Map<WebSocket, WsClientInfo>();

  handleConnection(client: WebSocket, req: any) {
    let role: 'ADMIN' | 'TEACHER' | 'STUDENT' = 'STUDENT';
    let userId: string | undefined;

    try {
      const url = new URL(req.url, 'http://localhost');
      const roleParam = url.searchParams.get('role')?.toUpperCase();
      if (roleParam === 'ADMIN' || roleParam === 'TEACHER' || roleParam === 'STUDENT') {
        role = roleParam;
      }
      userId = url.searchParams.get('userId') || undefined;
    } catch {
      // default
    }

    this.clients.set(client, { role, userId });
    this.logger.log(`Client connected: role=${role}, userId=${userId}, totalClients=${this.clients.size}`);

    // Send connection greeting
    client.send(
      JSON.stringify({
        event: 'connected',
        data: {
          status: 'online',
          role,
          message: 'Nyver WebSocket serveriga muvaffaqiyatli ulandi',
          timestamp: new Date().toISOString(),
        },
      }),
    );
  }

  handleDisconnect(client: WebSocket) {
    this.clients.delete(client);
    this.logger.log(`Client disconnected, totalClients=${this.clients.size}`);
  }

  @SubscribeMessage('register')
  handleRegister(client: WebSocket, payload: any) {
    const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
    const current = this.clients.get(client) || {};
    if (data?.role) current.role = data.role;
    if (data?.userId) current.userId = data.userId;
    this.clients.set(client, current);
  }

  @SubscribeMessage('broadcast')
  handleBroadcast(client: WebSocket, raw: any) {
    const payload: WsNotificationPayload = typeof raw === 'string' ? JSON.parse(raw) : raw;
    this.sendNotification(payload);
  }

  @SubscribeMessage('ping')
  handlePing(client: WebSocket) {
    client.send(JSON.stringify({ event: 'pong', timestamp: Date.now() }));
  }

  /**
   * Broadcast notification to clients matching target role
   */
  sendNotification(payload: WsNotificationPayload) {
    const fullPayload = {
      event: 'notification',
      data: {
        id: payload.id || `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        type: payload.type || 'SYSTEM',
        target: payload.target || 'ALL',
        title: payload.title,
        message: payload.message,
        channels: payload.channels || ['IN_APP'],
        createdAt: payload.createdAt || new Date().toISOString(),
        data: payload.data || {},
      },
    };

    const serialized = JSON.stringify(fullPayload);
    let sentCount = 0;

    for (const [ws, info] of this.clients.entries()) {
      if (ws.readyState === WebSocket.OPEN) {
        let shouldSend = false;

        if (payload.target === 'ALL') {
          shouldSend = true;
        } else if (payload.target === 'ADMIN' && info.role === 'ADMIN') {
          shouldSend = true;
        } else if (payload.target === 'TEACHERS' && (info.role === 'TEACHER' || info.role === 'ADMIN')) {
          shouldSend = true;
        } else if (payload.target === 'STUDENTS' && (info.role === 'STUDENT' || info.role === 'ADMIN')) {
          shouldSend = true;
        } else if (payload.target === 'DEBTORS' && (info.role === 'STUDENT' || info.role === 'ADMIN')) {
          shouldSend = true;
        }

        if (shouldSend) {
          ws.send(serialized);
          sentCount++;
        }
      }
    }

    this.logger.log(`Notification sent: "${payload.title}" to ${payload.target} (${sentCount} clients reached)`);
    return fullPayload.data;
  }
}
