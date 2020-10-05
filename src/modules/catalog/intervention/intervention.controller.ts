import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import * as _ from "lodash";
import { InterventionEntity } from './intervention.entity';
import { WriteInterventionDTO } from './intervention.dto';
import { InterventionService } from './intervention.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@UseInterceptors(SerializerInterceptor)
@Crud({
  model: {
    type: InterventionEntity
  },
  dto: {
    create: WriteInterventionDTO,
    update: WriteInterventionDTO
  }
})
@Controller("/interventions")
export class InterventionController {
  constructor(
    public service: InterventionService
  ) { }
}
