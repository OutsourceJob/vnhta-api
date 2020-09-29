import { Controller, UseGuards, Get, Param, Query } from "@nestjs/common";
import { CollectionService } from './collection.service';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody } from '@nestjsx/crud';
import { CollectionEntity } from './collection.entity';
import { CreateCollectionDTO, UpdateCollectionDTO } from './collection.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ArticleService } from '../article/article.service';
import * as _ from "lodash"
import { Language } from '../../interfaces/index';

@Crud({
  model: {
    type: CollectionEntity,
  },
  dto: {
    create: CreateCollectionDTO,
    update: UpdateCollectionDTO,
  },
  routes: {
    deleteOneBase: {
      interceptors: [],
      decorators: [],
      returnDeleted: true,
    },
  },
})
@Controller("/collections")
export class CollectionController {
  constructor(
    public service: CollectionService,
    public articleService: ArticleService
  ) { }

  get base(): CrudController<CollectionEntity> {
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

  @Get("/:collectionId/articles")
  async getArticlesByCollectionId(
    @Param("collectionId") collectionId: number
  ) {
    return await this.articleService.getArticlesByCollectionId(collectionId);
  }

  @Get("/:collectionId/latest-versions")
  async getLatestVersionsByCollectionId(
    @Param("collectionId") collectionId: number,
  ) {
    return await this.service.getLatestVersionsByCollectionId(collectionId);
  }

  @Get("/:collectionId/random-versions")
  async getRandomAndLatestVersion(
    @Param("collectionId") collectionId: number,
  ) {
    return await this.service.getRandomAndLatestVersion(collectionId);
  }
}