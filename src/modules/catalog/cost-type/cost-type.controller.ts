import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { CostTypeEntity } from './cost-type.entity';
import { CostTypeService } from './cost-type.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WriteCostTypeDTO } from './cost-type.dto';

@Crud({
  model: {
    type: CostTypeEntity
  },
  dto: {
    create: WriteCostTypeDTO,
    update: WriteCostTypeDTO
  }
})
@Controller("/cost-types")
@UseInterceptors(SerializerInterceptor)
export class CostTypeController {
  constructor(public service: CostTypeService) { }
}
