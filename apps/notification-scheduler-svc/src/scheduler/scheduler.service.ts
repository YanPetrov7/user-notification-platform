import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { UserCreatedPayload } from './interfaces';
import { PUSH_NOTIFICATION_DELAYS_MS } from './scheduler.constants';
import { EventName, QueueName } from './enums';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectQueue(QueueName.NOTIFICATIONS)
    private readonly notificationQueue: Queue,
  ) {}

  async handleUserCreatedEvent(user: UserCreatedPayload): Promise<void> {
    await this.notificationQueue.add(EventName.USER_CREATED, user, {
      delay: PUSH_NOTIFICATION_DELAYS_MS[EventName.USER_CREATED],
    });

    this.logger.debug(
      `Enqueued: ${EventName.USER_CREATED} for ${user.username}`,
    );
  }
}
