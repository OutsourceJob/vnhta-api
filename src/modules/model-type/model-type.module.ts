import { Module } from '@nestjs/common';
import { ModelTypeController } from './model-type.controller';
import { ModelTypeService } from './model-type.service';

@Module({
  controllers: [ModelTypeController],
  providers: [ModelTypeService]
})
export class ModelTypeModule {}
