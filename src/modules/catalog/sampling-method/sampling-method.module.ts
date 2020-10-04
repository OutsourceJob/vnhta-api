import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SamplingMethodController } from './sampling-method.controller';
import { SamplingMethodEntity } from './sampling-method.entity';
import { SamplingMethodService } from './sampling-method.service';

@Module({
  imports: [TypeOrmModule.forFeature([SamplingMethodEntity])],
  controllers: [SamplingMethodController],
  providers: [SamplingMethodService],
  exports: [SamplingMethodService],
})
export class SamplingMethodModule {}
