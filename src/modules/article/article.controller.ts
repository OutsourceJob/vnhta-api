import { Controller, UseGuards, Post, Param, Get } from "@nestjs/common";
import { Crud, Override, CrudController, CrudRequest, ParsedRequest, ParsedBody } from '@nestjsx/crud';
import { ArticleEntity } from './article.entity';
import { CreateArticleDTO, UpdateArticleDTO } from './article.dto';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as _ from "lodash";

@Crud({
  model: {
    type: ArticleEntity,
  },
  dto: {
    create: CreateArticleDTO,
    update: UpdateArticleDTO,
  },
  routes: {
    deleteOneBase: {
      interceptors: [],
      decorators: [],
      returnDeleted: true,
    },
  },
})
@Controller("/articles")
export class ArticleController {
  constructor(
    public service: ArticleService
  ) { }

  get base(): CrudController<ArticleEntity> {
    return this;
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() body) {
    return this.base.createOneBase(req, body);
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() body) {
    return this.base.updateOneBase(req, body);
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }

  @Post("/:articleId/duplicate")
  async duplicateArticle(@Param("articleId") articleId: number) {
    return await this.service.duplicateArticle(articleId)
  }
}