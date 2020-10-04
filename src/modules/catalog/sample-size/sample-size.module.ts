import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleSizeController } from './sample-size.controller';
import { SampleSizeEntity } from './sample-size.entity';
import { SampleSizeService } from './sample-size.service';

@Module({
  imports: [TypeOrmModule.forFeature([SampleSizeEntity])],
  controllers: [SampleSizeController],
  providers: [SampleSizeService],
  exports: [SampleSizeService],
})
export class SampleSizeModule {}
