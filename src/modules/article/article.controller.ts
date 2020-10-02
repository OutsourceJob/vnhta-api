import { Controller, Body, UseInterceptors, BadRequestException } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { ArticleEntity } from './article.entity';
import { WriteArticleDTO } from './article.dto';
import { ArticleService } from './article.service';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import * as _ from "lodash";

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

  @Override()
  getOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    let articleId: number;
    const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
    if (!fieldId) throw new BadRequestException("Aritcle Id is required")

    if (fieldId) articleId = fieldId.value;

    return this.service.getArticleById(articleId)
  }
}
