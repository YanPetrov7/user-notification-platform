import { NestFactory } from '@nestjs/core';
import { NotificationSchedulerSvcModule } from './notification-scheduler-svc.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationSchedulerSvcModule);
  await app.listen(process.env.port ?? 3000);
}

void bootstrap();
