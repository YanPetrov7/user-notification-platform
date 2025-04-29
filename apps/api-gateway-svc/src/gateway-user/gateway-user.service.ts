import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { GatewayNotificationSchedulerService } from '../gateway-notification-scheduler/gateway-notification-scheduler.service';
import { MICROSERVICES_CLIENTS } from '../app.constants';

@Injectable()
export class GatewayUserService {
  private readonly logger = new Logger(GatewayUserService.name);

  constructor(
    @Inject(MICROSERVICES_CLIENTS.USER_SERVICE)
    private readonly userClient: ClientProxy,
    private readonly notificationScheduler: GatewayNotificationSchedulerService,
  ) {}

  async create(data: object): Promise<object> {
    const result: object = await this.exec(
      this.userClient.send({ cmd: 'create-user' }, data),
    );

    this.notificationScheduler.handleUserCreatedEvent(result);

    return result;
  }

  async findAll(): Promise<object[]> {
    return this.exec(this.userClient.send({ cmd: 'find-all-users' }, {}));
  }

  async find(id: number): Promise<object> {
    return this.exec(this.userClient.send({ cmd: 'find-user' }, id));
  }

  async update(id: number, data: object): Promise<object> {
    return this.exec(
      this.userClient.send({ cmd: 'update-user' }, { id, ...data }),
    );
  }

  async remove(id: number): Promise<void> {
    await this.exec(this.userClient.send({ cmd: 'remove-user' }, id));
  }

  private async exec<T>(obs: Observable<T>): Promise<T> {
    try {
      return await lastValueFrom(obs);
    } catch (e) {
      this.logger.error(
        `Failed to execute request: ${e.message || 'Internal server error'}`,
      );

      throw new HttpException(
        e.message || 'Internal server error',
        e.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
