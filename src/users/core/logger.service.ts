// src/core/logger.service.ts

import { Injectable } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class CustomLoggerService {
  private readonly logger: Logger;

  constructor() {
    const transport = new (transports.DailyRotateFile)({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    });

    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        transport,
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple(),
          ),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  // Puedes agregar más métodos según sea necesario
}