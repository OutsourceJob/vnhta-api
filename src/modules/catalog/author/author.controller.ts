import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { AuthorEntity } from './author.entity';
import { AuthorService } from './author.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import { WriteAuthorDTO } from './author.dto';

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
}
