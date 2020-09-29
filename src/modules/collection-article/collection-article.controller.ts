// import { Controller, Get, Param, Post, Body, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
// import { ArticleService } from '../article/article.service';
// import { CollectionArticleService } from './collection-article.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// @Controller("/collections/:collectionId/articles")
// export class CollectionArticleController {
//   constructor(
//     private articleService: ArticleService,
//     private collectionArticleService: CollectionArticleService
//   ) { }

//   @Get()
//   async getArticlesByCollectionId(
//     @Param("collectionId", ParseIntPipe) collectionId: number,
//     @Query("filter") filters: any[]
//   ) {
//     return await this.collectionArticleService.findArticlesByCollectionId(collectionId)
//   }

//   @Post()
//   @UseGuards(JwtAuthGuard)
//   async addArticleToCollection(
//     @Param("collectionId", ParseIntPipe) collectionId: number,
//     @Body("articleId") articleId: number
//   ) {
//     return await this.collectionArticleService.addArticleToCollection(collectionId, articleId);
//   }
// }