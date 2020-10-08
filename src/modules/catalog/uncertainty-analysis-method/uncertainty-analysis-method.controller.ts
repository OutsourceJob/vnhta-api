import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { UncertaintyAnalysisMethodEntity } from './uncertainty-analysis-method.entity';
import { UncertaintyAnalysisService } from './uncertainty-analysis-method.service';
import { WriteUncertaintyAnalysisMethodDTO } from './uncertainty-analysis-method.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: UncertaintyAnalysisMethodEntity
   },
   dto: {
      create: WriteUncertaintyAnalysisMethodDTO,
      update: WriteUncertaintyAnalysisMethodDTO
   }
})
@Controller("uncertainty-analysis-methods")
@UseInterceptors(SerializerInterceptor)
export class UncertaintyAnalysisMethodController {
   constructor(public service: UncertaintyAnalysisService) { }
}