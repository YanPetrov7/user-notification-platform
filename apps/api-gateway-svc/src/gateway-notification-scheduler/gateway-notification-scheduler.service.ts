import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from '../app.constants';

@Injectable()
export class GatewayNotificationSchedulerService {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.NOTIFICATION_SCHEDULER_SERVICE)
    private readonly notificationSchedulerService: ClientProxy,
  ) {}

  handleUserCreatedEvent(user: object): void {
    this.notificationSchedulerService.emit('user.created', user);
  }
}
