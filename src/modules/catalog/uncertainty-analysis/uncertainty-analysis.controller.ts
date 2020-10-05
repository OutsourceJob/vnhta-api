import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { UncertaintyAnalysisEntity } from './uncertainty-analysis.entity';
import { UncertaintyAnalysisService } from './uncertainty-analysis.service';
import { WriteUncertaintyAnalysisDTO } from './uncertainty-analysis.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: UncertaintyAnalysisEntity
   },
   dto: {
      create: WriteUncertaintyAnalysisDTO,
      update: WriteUncertaintyAnalysisDTO
   }
})
@Controller("uncertainty-analysis")
@UseInterceptors(SerializerInterceptor)
export class UncertaintyAnalysisController {
   constructor(public service: UncertaintyAnalysisService) { }
}