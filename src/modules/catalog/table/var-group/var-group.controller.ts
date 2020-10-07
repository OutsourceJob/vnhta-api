import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { VarGroupEntity } from './var-group.entity';
import { VarGroupService } from './var-group.service';
import { SerializerInterceptor } from '../../../../serialization/serializer.interceptor';
import { WriteVarGroupDTO } from './var-group.dto';

@Crud({
  model: {
    type: VarGroupEntity
  },
  dto: {
    create: WriteVarGroupDTO,
    update: WriteVarGroupDTO
  }
})
@Controller("/var-groups")
@UseInterceptors(SerializerInterceptor)
export class VarGroupController {
  constructor(public service: VarGroupService) { }
}
