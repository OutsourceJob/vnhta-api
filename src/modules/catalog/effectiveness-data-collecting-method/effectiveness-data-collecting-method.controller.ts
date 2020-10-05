import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { EffectivenessDataCollectingMethodEntity } from './effectiveness-data-collecting-method.entity';
import { EffectivenessDataCollectingMethodService } from './effectiveness-data-collecting-method.service';
import { WriteEffectivenessDataCollectingMethodDTO } from './effectiveness-data-collecting-method.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: EffectivenessDataCollectingMethodEntity
   },
   dto: {
      create: WriteEffectivenessDataCollectingMethodDTO,
      update: WriteEffectivenessDataCollectingMethodDTO
   }
})
@Controller("effectiveness-data-collecting-methods")
@UseInterceptors(SerializerInterceptor)
export class EffectivenessDataCollectingMethodController {
   constructor(public service: EffectivenessDataCollectingMethodService) { }
}