import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { Icd20Entity } from './icd-20.entity';
import { Icd20Service } from './icd-20.service';
import { WriteIcd20DTO } from './icd-20.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
  model: {
    type: Icd20Entity
  },
  dto: {
    create: WriteIcd20DTO,
    update: WriteIcd20DTO
  }
})
@Controller("/icd-20")
@UseInterceptors(SerializerInterceptor)
export class Icd20Controller {
  constructor(public service: Icd20Service) { }
}
