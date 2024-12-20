import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    handleUserAction(data: {
        userId: string;
        action: string;
    }): void;
}
