import { Controller } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { EventPattern } from '@nestjs/microservices';
import { UserCreatedPayload } from './interfaces';

@Controller()
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @EventPattern('user.created')
  handleUserCreatedEvent(user: UserCreatedPayload): Promise<void> {
    return this.schedulerService.handleUserCreatedEvent(user);
  }
}
