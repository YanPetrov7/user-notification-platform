import { Module } from '@nestjs/common';
import { NotificationSchedulerSvcController } from './notification-scheduler-svc.controller';
import { NotificationSchedulerSvcService } from './notification-scheduler-svc.service';

@Module({
  imports: [],
  controllers: [NotificationSchedulerSvcController],
  providers: [NotificationSchedulerSvcService],
})
export class NotificationSchedulerSvcModule {}
