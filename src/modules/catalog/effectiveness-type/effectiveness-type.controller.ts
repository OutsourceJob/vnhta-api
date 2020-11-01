import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { SerializerInterceptor } from 'src/serialization/serializer.interceptor';
import { WriteEffectivenessTypeDTO } from './effectiveness-type.dto';
import { EffectivenessTypeEntity } from './effectiveness-type.entity';
import { EffectivenessTypeService } from './effectiveness-type.service';

@UseInterceptors(SerializerInterceptor)
@Crud({
   model: {
      type: EffectivenessTypeEntity
   },
   dto: {
      create: WriteEffectivenessTypeDTO,
      update: WriteEffectivenessTypeDTO
   }
})
@Controller('effectiveness-types')
export class EffectivenessTypeController {
   constructor(
      public service: EffectivenessTypeService
   ) { }
}
