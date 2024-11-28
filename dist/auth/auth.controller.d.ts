import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
