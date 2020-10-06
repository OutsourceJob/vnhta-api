import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { VarEntity } from './var.entity';
import { VarService } from './var.service';
import { SerializerInterceptor } from '../../../../serialization/serializer.interceptor';
import { WriteVarDTO } from './var.dto';

@Crud({
  model: {
    type: VarEntity
  },
  dto: {
    create: WriteVarDTO,
    update: WriteVarDTO
  }
})
@Controller("/vars")
@UseInterceptors(SerializerInterceptor)
export class VarController {
  constructor(public service: VarService) { }
}
