import { Module } from '@nestjs/common';
import { GatewayNotificationSchedulerService } from './gateway-notification-scheduler.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATION_SCHEDULER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
        }),
      },
    ]),
  ],
  providers: [GatewayNotificationSchedulerService],
  exports: [GatewayNotificationSchedulerService],
})
export class GatewayNotificationSchedulerModule {}
