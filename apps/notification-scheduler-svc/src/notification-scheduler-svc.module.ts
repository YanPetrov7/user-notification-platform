import { Module } from '@nestjs/common';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    SchedulerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class NotificationSchedulerSvcModule {}
