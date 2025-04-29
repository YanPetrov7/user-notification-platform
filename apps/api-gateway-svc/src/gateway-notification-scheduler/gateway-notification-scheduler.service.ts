import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayNotificationSchedulerService {
  constructor(
    @Inject('NOTIFICATION_SCHEDULER_SERVICE')
    private readonly notificationSchedulerService: ClientProxy,
  ) {}

  handleUserCreatedEvent(user: object): void {
    this.notificationSchedulerService.emit('user.created', user);
  }
}
