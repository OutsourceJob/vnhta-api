import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { HeterogeneityAnalysisEntity } from './heterogeneity-analysis.entity';
import { HeterogeneityAnalysisService } from './heterogeneity-analysis.service';
import { WriteHeterogeneityAnalysisDTO } from './heterogeneity-analysis.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: HeterogeneityAnalysisEntity
   },
   dto: {
      create: WriteHeterogeneityAnalysisDTO,
      update: WriteHeterogeneityAnalysisDTO
   }
})
@Controller("heterogeneity-analysis")
@UseInterceptors(SerializerInterceptor)
export class HeterogeneityAnalysisController {
   constructor(public service: HeterogeneityAnalysisService) { }
}


