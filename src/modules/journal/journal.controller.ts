import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import * as _ from "lodash";
import { JournalEntity } from './journal.entity';
import { WriteJournalDTO } from './journal.dto';
import { JournalService } from './journal.service';

@UseInterceptors(SerializerInterceptor)
@Crud({
  model: {
    type: JournalEntity
  },
  dto: {
    create: WriteJournalDTO,
    update: WriteJournalDTO
  }
})
@Controller("/journals")
export class JournalController {
  constructor(
    public service: JournalService
  ) { }
}
