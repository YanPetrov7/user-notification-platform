import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { NotificationService } from '../../notification/notification.service';
import { PUSH_NOTIFICATION_TEMPLATES } from '../scheduler.constants';
import { UserCreatedPayload } from '../interfaces';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private readonly notificationService: NotificationService) {
    super();
  }

  async process(job: Job<UserCreatedPayload>): Promise<void> {
    const { username } = job.data;

    this.logger.debug(
      `Processing notification for user: ${username} with job ID: ${job.id}`,
    );

    await this.notificationService.sendNotification({
      userId: username,
      title: PUSH_NOTIFICATION_TEMPLATES.USER_CREATED.title,
      message: PUSH_NOTIFICATION_TEMPLATES.USER_CREATED.message.replace(
        '{{name}}',
        username,
      ),
    });
  }
}
