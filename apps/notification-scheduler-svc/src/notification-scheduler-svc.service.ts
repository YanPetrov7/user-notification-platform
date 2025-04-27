import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationSchedulerSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
