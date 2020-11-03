import { Controller, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { Crud, Override, ParsedBody, ParsedRequest, CrudRequest } from "@nestjsx/crud";
import { AuthorEntity } from './author.entity';
import { AuthorService } from './author.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WriteAuthorDTO } from './author.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import * as _ from "lodash"

@Crud({
  model: {
    type: AuthorEntity
  },
  dto: {
    create: WriteAuthorDTO,
    update: WriteAuthorDTO
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
@Controller("/authors")
@UseInterceptors(SerializerInterceptor)
export class AuthorController {
  constructor(public service: AuthorService) { }

  @UseGuards(JwtAuthGuard)
  @Override()
  createOne(
    @ParsedRequest() crudReq: CrudRequest,
    @ParsedBody() data: WriteAuthorDTO,
    @Request() req: any
  ) {
    _.assign(
      data,
      { accountId: _.get(req, "user.id") }
    )
    return this.service.createOne(crudReq, data)
  }
}