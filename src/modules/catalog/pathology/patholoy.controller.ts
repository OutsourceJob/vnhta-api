import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { PathologyEntity } from './pathology.entity';
import { PathologyService } from './pathology.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WritePathologyDTO } from './pathology.dto';

@Crud({
  model: {
    type: PathologyEntity
  },
  dto: {
    create: WritePathologyDTO,
    update: WritePathologyDTO
  }
})
@Controller("/pathologies")
@UseInterceptors(SerializerInterceptor)
export class PathologyController {
  constructor(public service: PathologyService) { }
}
