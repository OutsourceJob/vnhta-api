import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { AnalysisMethodEntity } from './analysis-method.entity';
import { AnalysisMethodService } from './analysis-method.service';
import { WriteAnalysisMethodDTO } from './analysis-method.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: AnalysisMethodEntity
   },
   dto: {
      create: WriteAnalysisMethodDTO,
      update: WriteAnalysisMethodDTO
   }
})
@Controller("analysis-methods")
@UseInterceptors(SerializerInterceptor)
export class AnalysisMethodController {
   constructor(public service: AnalysisMethodService) { }
}