import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ArticleEntity } from './article.entity';
import { Connection } from "typeorm";

@Injectable()
export class ArticleService extends TypeOrmCrudService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity) repo: Repository<ArticleEntity>,
    private connection: Connection
  ) {
    super(repo);
  }

  async getArticlesByCollectionId(collectionId: number) {
    const res = await this.repo.find({ where: { collectionId } })
    return res
  }

  async duplicateArticle(articleId: number) {
    const foundArticle = await this.repo.findOne(articleId)

    if (!foundArticle) throw new NotFoundException("Article Not Found");

    return await this.repo
      .create({
        userId: foundArticle.userId,
        title: foundArticle.title,
        imageUrl: foundArticle.imageUrl,
        content: foundArticle.content,
        coinId: foundArticle.coinId
      })
      .save()
  }
}