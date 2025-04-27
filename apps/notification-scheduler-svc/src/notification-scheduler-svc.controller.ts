import { Controller, Get } from '@nestjs/common';
import { NotificationSchedulerSvcService } from './notification-scheduler-svc.service';

@Controller()
export class NotificationSchedulerSvcController {
  constructor(private readonly notificationSchedulerSvcService: NotificationSchedulerSvcService) {}

  @Get()
  getHello(): string {
    return this.notificationSchedulerSvcService.getHello();
  }
}
