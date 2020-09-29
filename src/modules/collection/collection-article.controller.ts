import { Controller, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller("/collections")
export class CollectionArticleController {
  constructor(
    private collectionService: CollectionService
  ) { }

  @Post("/:collectionId/articles")
  async addArticle(
    @Param("collectionId", ParseIntPipe) collectionId: number,
    @Body("articleId", ParseIntPipe) articleId: number
  ) {
    return await this.collectionService.addArticleToCollection(collectionId, articleId);
  }
}