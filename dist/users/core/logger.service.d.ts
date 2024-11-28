import 'winston-daily-rotate-file';
export declare class CustomLoggerService {
    private readonly logger;
    constructor();
    log(message: string): void;
    error(message: string): void;
    warn(message: string): void;
}
