// import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { CollectionArticleRepository } from './collection-article.repository';
// import { Connection } from "typeorm"
// import { ArticleEntity } from '../article/article.entity';
// import { ArticleStatus } from '../article/article.dto';
// import * as _ from "lodash";
// import { ArticleService } from '../article/article.service';
// import { CollectionService } from '../collection/collection.service';
// import { ArticleType } from '../../interfaces/index';

// @Injectable()
// export class CollectionArticleService {
//   constructor(
//     @InjectRepository(CollectionArticleRepository) private collectionArticleRepo: CollectionArticleRepository,
//     private articleService: ArticleService,
//     private collectionService: CollectionService,
//     private connection: Connection
//   ) { }

//   async findArticlesByCollectionId(collectionId: number) {
//     const articles: ArticleEntity[] = await this.connection.query(`
//       SELECT
//         article.*
//       FROM collection_article
//       INNER JOIN article
//         ON collection_article.article_id = article.id
//       WHERE
//         collection_article.collection_id = ${collectionId}
//         AND article.type = "Normal"
//     `)

//     return articles;
//   }

//   async addArticleToCollection(collectionId: number, articleId: number) {
//     const foundArticle = await this.articleService.findOne(articleId)
//     if (!foundArticle) throw new NotFoundException("Article not found")

//     if (foundArticle.type === ArticleType.Template) throw new BadRequestException("Cannot add template to collection")

//     if (foundArticle.status === ArticleStatus.Draft) throw new BadRequestException("Article needs to be published")

//     const foundCollection = await this.collectionService.findOne(collectionId)
//     if (foundCollection) throw new NotFoundException("Collection not found")

//     return await this.collectionArticleRepo.create({
//       collectionId,
//       articleId
//     }).save()
//   }
// }