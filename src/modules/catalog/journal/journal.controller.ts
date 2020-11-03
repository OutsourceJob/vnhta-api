import { Controller, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import * as _ from "lodash";
import { JournalEntity } from './journal.entity';
import { WriteJournalDTO } from './journal.dto';
import { JournalService } from './journal.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@UseInterceptors(SerializerInterceptor)
@Crud({
  model: {
    type: JournalEntity
  },
  dto: {
    create: WriteJournalDTO,
    update: WriteJournalDTO
  },
  query: {
    sort: [
      {
        field: "fullName",
        order: "ASC"
      }
    ]
  }
})
@Controller("/journals")
export class JournalController {
  constructor(
    public service: JournalService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Override()
  createOne(
    @ParsedRequest() crudReq: CrudRequest,
    @ParsedBody() data: WriteJournalDTO,
    @Request() req: any
  ) {
    _.assign(
      data,
      { accountId: _.get(req, "user.id") }
    )
    return this.service.createOne(crudReq, data)
  }
}
