import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SendNotificationDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async sendNotification(dto: SendNotificationDto): Promise<void> {
    try {
      const url = this.configService.getOrThrow<string>('NOTIFICATION_URL');

      await firstValueFrom(this.httpService.post<void>(url, dto));

      this.logger.debug(
        `Notification successfully send with payload: ${JSON.stringify(dto)}`,
      );
    } catch (e) {
      this.logger.error(
        `Failed to send notification for user ${dto.userId}:`,
        e.message || 'Internal server error',
      );

      throw new InternalServerErrorException(
        `Failed to send notification: ${e.message || 'Internal server error'}`,
      );
    }
  }
}
