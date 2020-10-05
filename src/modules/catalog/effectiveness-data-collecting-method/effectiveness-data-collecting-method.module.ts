import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EffectivenessDataCollectingMethodEntity } from './effectiveness-data-collecting-method.entity';
import { EffectivenessDataCollectingMethodService } from './effectiveness-data-collecting-method.service';
import { EffectivenessDataCollectingMethodController } from './effectiveness-data-collecting-method.controller';

@Module({
   imports: [TypeOrmModule.forFeature([EffectivenessDataCollectingMethodEntity])],
   controllers: [EffectivenessDataCollectingMethodController],
   providers: [EffectivenessDataCollectingMethodService],
   exports: [EffectivenessDataCollectingMethodService],
})
export class EffectivenessDataCollectingMethodModule { }
