import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityOfLifeToolkitController } from './quality-of-life-toolkit.controller';
import { QualityOfLifeToolkitEntity } from './quality-of-life-toolkit.entity';
import { QualityOfLifeToolkitService } from './quality-of-life-toolkit.service';

@Module({
  imports: [TypeOrmModule.forFeature([QualityOfLifeToolkitEntity])],
  controllers: [QualityOfLifeToolkitController],
  providers: [QualityOfLifeToolkitService],
  exports: [QualityOfLifeToolkitService],
})
export class QualityOfLifeToolkitModule {}
