import { NestFactory } from '@nestjs/core';
import { NotificationSchedulerSvcModule } from './notification-scheduler-svc.module';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const configService = new ConfigService();

  const HOST = configService.getOrThrow<string>('REDIS_HOST');
  const PORT = configService.getOrThrow<number>('REDIS_PORT');

  const redisConfig: RedisOptions = {
    transport: Transport.REDIS,
    options: {
      host: HOST,
      port: PORT,
    },
  };

  const app = await NestFactory.createMicroservice<RedisOptions>(
    NotificationSchedulerSvcModule,
    redisConfig,
  );

  await app.listen();
}

void bootstrap();
