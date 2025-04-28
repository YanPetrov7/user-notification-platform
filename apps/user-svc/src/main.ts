import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserSvcModule } from './user-svc.module';
import { RpcValidationFilter } from './filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserSvcModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@rabbitmq:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalFilters(new RpcValidationFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
}

void bootstrap();
