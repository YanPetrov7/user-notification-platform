import { Module } from '@nestjs/common';
import { GatewayUserService } from './gateway-user.service';
import { GatewayUserController } from './gateway-user.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [GatewayUserController],
  providers: [
    GatewayUserService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://user:password@rabbitmq:5672'],
            queue: 'user_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
})
export class GatewayUserModule {}
