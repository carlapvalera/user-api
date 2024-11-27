// src/users/users.gateway.ts

import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway()
  export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    handleConnection(client: any) {
      console.log('Client connected:', client.id);
    }
  
    handleDisconnect(client: any) {
      console.log('Client disconnected:', client.id);
    }
  
    @SubscribeMessage('userAction')
    handleUserAction(data: { userId: string; action: string }) {
      const message = `El usuario ${data.userId} realizó la operación ${data.action}`;
      this.server.emit('operationNotification', message); // Emitir mensaje a todos los clientes conectados
    }
  }