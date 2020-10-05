import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { ModelTypeEntity } from './model-type.entity';
import { ModelTypeService } from './model-type.service';
import { WriteModelTypeDTO } from './model-type.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: ModelTypeEntity
   },
   dto: {
      create: WriteModelTypeDTO,
      update: WriteModelTypeDTO
   }
})
@Controller("model-types")
@UseInterceptors(SerializerInterceptor)
export class ModelTypeController {
   constructor(public service: ModelTypeService) { }
}