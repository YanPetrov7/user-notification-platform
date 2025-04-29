import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { GatewayNotificationSchedulerService } from '../gateway-notification-scheduler/gateway-notification-scheduler.service';

@Injectable()
export class GatewayUserService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
    private readonly notificationScheduler: GatewayNotificationSchedulerService,
  ) {}

  async create(data: object): Promise<object> {
    const result: object = await this.exec(
      this.userClient.send({ cmd: 'create-user' }, data),
    );

    if (!('error' in result)) {
      this.notificationScheduler.handleUserCreatedEvent(result);
    }

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
    } catch (e: unknown) {
      if (e instanceof RpcException) {
        const payload = e.getError() as {
          message?: string;
          statusCode?: number;
        };
        throw new HttpException(
          payload.message || 'Unknown RPC error',
          payload.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (e instanceof HttpException) {
        throw e;
      }

      if (e instanceof Error) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      throw new HttpException(
        'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
