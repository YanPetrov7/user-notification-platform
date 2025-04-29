import { NestFactory } from '@nestjs/core';
import { UserSvcModule } from './user-svc.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  RmqOptions,
  Transport,
  MicroserviceOptions,
} from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const configService = new ConfigService();

  const USER = configService.getOrThrow<string>('RABBITMQ_USER');
  const PASS = configService.getOrThrow<string>('RABBITMQ_PASS');
  const HOST = configService.getOrThrow<string>('RABBITMQ_HOST');
  const QUEUE = configService.getOrThrow<string>('RABBITMQ_QUEUE');

  const rmqConfig: RmqOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASS}@${HOST}`],
      queue: QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserSvcModule,
    rmqConfig,
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
}

void bootstrap();
