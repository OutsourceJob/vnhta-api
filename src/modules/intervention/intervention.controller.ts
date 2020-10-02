import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import * as _ from "lodash";
import { InterventionEntity } from './intervention.entity';
import { WriteInterventionDTO } from './intervention.dto';
import { InterventionService } from './intervention.service';

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
