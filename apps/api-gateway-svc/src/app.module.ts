import { Module } from '@nestjs/common';
import { GatewayUserModule } from './gateway-user/gateway-user.module';
import { ConfigModule } from '@nestjs/config';
import { GatewayNotificationSchedulerModule } from './gateway-notification-scheduler/gateway-notification-scheduler.module';

@Module({
  imports: [
    GatewayUserModule,
    GatewayNotificationSchedulerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
