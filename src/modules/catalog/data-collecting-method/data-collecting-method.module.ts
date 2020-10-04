import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCollectingMethodController } from './data-collecting-method.controller';
import { DataCollectingMethodEntity } from './data-collecting-method.entity';
import { DataCollectingMethodService } from './data-collecting-method.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataCollectingMethodEntity])],
  controllers: [DataCollectingMethodController],
  providers: [DataCollectingMethodService],
  exports: [DataCollectingMethodService],
})
export class DataCollectingMethodModule {}
