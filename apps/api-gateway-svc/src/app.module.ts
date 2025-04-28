import { Module } from '@nestjs/common';
import { GatewayUserModule } from './gateway-user/gateway-user.module';

@Module({
  imports: [GatewayUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
