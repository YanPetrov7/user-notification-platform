import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { NotificationService } from '../../notification/notification.service';
import { PUSH_NOTIFICATION_TEMPLATES } from '../scheduler.constants';
import { UserCreatedPayload } from '../interfaces';
import { EventName, QueueName } from '../enums';

@Processor(QueueName.NOTIFICATIONS)
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private readonly notificationService: NotificationService) {
    super();
  }

  async process(job: Job<UserCreatedPayload>): Promise<void> {
    switch (job.name as EventName) {
      case EventName.USER_CREATED:
        await this.handleUserCreated(job.data);
        break;
      default:
        this.logger.warn(`Unknown job type ${job.name}`);
    }
  }

  private async handleUserCreated(data: UserCreatedPayload): Promise<void> {
    const { username } = data;

    this.logger.debug(`Sending notification for ${username}`);

    const template = PUSH_NOTIFICATION_TEMPLATES[EventName.USER_CREATED];

    await this.notificationService.sendNotification({
      userId: username,
      title: template.title,
      message: template.message.replace('{{name}}', username),
    });
  }
}
