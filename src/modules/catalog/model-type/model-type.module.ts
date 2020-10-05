import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelTypeEntity } from './model-type.entity';
import { ModelTypeService } from './model-type.service';
import { ModelTypeController } from './model-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModelTypeEntity])],
  controllers: [ModelTypeController],
  providers: [ModelTypeService],
  exports: [ModelTypeService],
})
export class ModelTypeModule { }
