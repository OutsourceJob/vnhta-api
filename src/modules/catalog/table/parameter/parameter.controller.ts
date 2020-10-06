import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { ParameterEntity } from './parameter.entity';
import { ParameterService } from './parameter.service';
import { SerializerInterceptor } from '../../../../serialization/serializer.interceptor';
import { WriteParameterDTO } from './parameter.dto';

@Crud({
  model: {
    type: ParameterEntity
  },
  dto: {
    create: WriteParameterDTO,
    update: WriteParameterDTO
  }
})
@Controller("/parameters")
@UseInterceptors(SerializerInterceptor)
export class ParameterController {
  constructor(public service: ParameterService) { }
}
