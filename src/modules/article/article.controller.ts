import { Controller, Body, UseInterceptors, BadRequestException, Post, Param, UploadedFile, Get, Query } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { ArticleEntity } from './article.entity';
import { WriteArticleDTO } from './article.dto';
import { ArticleService } from './article.service';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';
import * as _ from "lodash";
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseInterceptors(SerializerInterceptor)
@Crud({
  model: {
    type: ArticleEntity
  },
  dto: {
    create: WriteArticleDTO,
    update: WriteArticleDTO
  },
  query: {
    join: {
      authors: {
        eager: true
      }
    }
  }
})
@Controller("/articles")
export class ArticleController {
  constructor(
    public service: ArticleService,
    private uploadService: UploadService
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
    if (!fieldId) throw new BadRequestException("Article Id is required")

    if (fieldId) articleId = fieldId.value;

    return this.service.getArticleById(articleId)
  }

  @Override()
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() data: WriteArticleDTO
  ) {
    let articleId: number;
    const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
    if (!fieldId) throw new BadRequestException("Article Id is required")

    if (fieldId) articleId = fieldId.value;

    return this.service.updateArticleById(articleId, data)
  }

  @Post("/:articleId/upload-full-text")
  @UseInterceptors(FileInterceptor("full-text"))
  async uploadFullText(
    @Param("articleId") articleId: number,
    @UploadedFile() file: any
  ) {
    const res = await this.uploadService.uploadFile(file.buffer, file.originalname)
    return await this.service.updateFulltext(articleId, res.PDFUrl)
  }

  @Post("/:articleId/remove-full-text")
  async removeFullText(
    @Param("articleId") articleId: number,
  ) {
    return await this.service.removeFullText(articleId)
  }

  @Get("/articles")
  @Override()
  async getMany(
    @ParsedRequest() req: CrudRequest,
    @Query() query
  ) {
    const text = query.text

    if (!text) return this.service.getMany(req);

    if (text === "cost" || text === "chi phí") return await this.service.searchCost(text)
    if (
      text === "chi phí hiệu quả" || text === "chi phí - hiệu quả" ||
      text === "cost - effectiveness" || text === "cost effectiveness"
    ) return await this.service.searchCostEffectiveness(text)
  }
}
