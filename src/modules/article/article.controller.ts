import { Controller, Body, UseInterceptors } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { ArticleEntity } from './article.entity';
import { WriteArticleDTO } from './article.dto';
import { ArticleService } from './article.service';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';

@UseInterceptors(SerializerInterceptor)
@Crud({
  model: {
    type: ArticleEntity
  },
  dto: {
    create: WriteArticleDTO,
    update: WriteArticleDTO
  }
})
@Controller("/articles")
export class ArticleController {
  constructor(
    public service: ArticleService
  ) { }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() data: WriteArticleDTO
  ) {
    return this.service.createArticle(data)
  }
}
