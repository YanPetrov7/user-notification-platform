import { Module } from '@nestjs/common';
import { GatewayUserService } from './gateway-user.service';
import { GatewayUserController } from './gateway-user.controller';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { GatewayNotificationSchedulerModule } from '../gateway-notification-scheduler/gateway-notification-scheduler.module';

@Module({
  controllers: [GatewayUserController],
  imports: [GatewayNotificationSchedulerModule],
  providers: [
    GatewayUserService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService): ClientProxy => {
        const USER = configService.get<string>('RABBITMQ_USER');
        const PASS = configService.get<string>('RABBITMQ_PASS');
        const HOST = configService.get<string>('RABBITMQ_HOST');
        const QUEUE = configService.get<string>('RABBITMQ_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASS}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class GatewayUserModule {}
