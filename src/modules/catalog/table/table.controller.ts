import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { TableEntity } from './table.entity';
import { TableService } from './table.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WriteTableDTO } from './table.dto';

@Crud({
  model: {
    type: TableEntity
  },
  dto: {
    create: WriteTableDTO,
    update: WriteTableDTO
  }
})
@Controller("/features")
@UseInterceptors(SerializerInterceptor)
export class TableController {
  constructor(public service: TableService) { }
}
