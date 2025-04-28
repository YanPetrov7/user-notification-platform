import { Module } from '@nestjs/common';
import { GatewayUserModule } from './gateway-user/gateway-user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GatewayUserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
