// src/core/core.module.ts

import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService], // Asegúrate de exportarlo
})
export class CoreModule {}