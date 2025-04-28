import { Module } from '@nestjs/common';
import { PostgressModule } from './postgress/postgress.module';

@Module({
  imports: [PostgressModule],
  exports: [PostgressModule],
})
export class DatabaseModule {}
