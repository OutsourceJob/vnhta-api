import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { RowEntity } from './row.entity';
import { RowService } from './row.service';
import { SerializerInterceptor } from '../../../../serialization/serializer.interceptor';
import { WriteRowDTO } from './row.dto';

@Crud({
  model: {
    type: RowEntity
  },
  dto: {
    create: WriteRowDTO,
    update: WriteRowDTO
  }
})
@Controller("/rows")
@UseInterceptors(SerializerInterceptor)
export class RowController {
  constructor(public service: RowService) { }
}
