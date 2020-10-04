import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { CostComponentEntity } from './cost-component.entity';
import { CostComponentService } from './cost-component.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WriteCostComponentDTO } from './cost-component.dto';

@Crud({
  model: {
    type: CostComponentEntity
  },
  dto: {
    create: WriteCostComponentDTO,
    update: WriteCostComponentDTO
  }
})
@Controller("/cost-components")
@UseInterceptors(SerializerInterceptor)
export class CostComponentController {
  constructor(public service: CostComponentService) { }
}
