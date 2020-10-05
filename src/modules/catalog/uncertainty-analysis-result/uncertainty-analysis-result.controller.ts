import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { UncertaintyAnalysisResultEntity } from './uncertainty-analysis-result.entity';
import { UncertaintyAnalysisResultService } from './uncertainty-analysis-result.service';
import { WriteUncertaintyAnalysisResultDTO } from './uncertainty-analysis-result.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: UncertaintyAnalysisResultEntity
   },
   dto: {
      create: WriteUncertaintyAnalysisResultDTO,
      update: WriteUncertaintyAnalysisResultDTO
   }
})
@Controller("uncertainty-analysis-results")
@UseInterceptors(SerializerInterceptor)
export class UncertaintyAnalysisResultController {
   constructor(public service: UncertaintyAnalysisResultService) { }
}