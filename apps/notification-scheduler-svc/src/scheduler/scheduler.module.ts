import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { BullModule } from '@nestjs/bullmq';
import { NotificationModule } from '../notification/notification.module';
import { NotificationProcessor } from './processors';
import { QueueName } from './enums';

@Module({
  imports: [
    NotificationModule,
    BullModule.registerQueueAsync({
      name: QueueName.NOTIFICATIONS,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
    }),
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService, NotificationProcessor],
})
export class SchedulerModule {}
