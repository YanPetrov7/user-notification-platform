import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { UserCreatedPayload } from './interfaces';
import { PUSH_NOTIFICATION_DELAYS_MS } from './scheduler.constants';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectQueue('notifications')
    private readonly notificationQueue: Queue,
  ) {}

  async handleUserCreatedEvent(user: UserCreatedPayload): Promise<void> {
    await this.notificationQueue.add('user-created', user, {
      delay: PUSH_NOTIFICATION_DELAYS_MS.USER_CREATED,
    });
  }
}
