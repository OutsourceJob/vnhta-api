import { Module } from '@nestjs/common';
import { EffectivenessTypeService } from './effectiveness-type.service';
import { EffectivenessTypeController } from './effectiveness-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EffectivenessTypeEntity } from './effectiveness-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EffectivenessTypeEntity])],
  providers: [EffectivenessTypeService],
  controllers: [EffectivenessTypeController],
  exports: [EffectivenessTypeService]
})
export class EffectivenessTypeModule { }
