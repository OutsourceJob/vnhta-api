import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WriteArticleDTO } from './article.dto';
import * as _ from "lodash";

@Injectable()
export class ArticleService extends TypeOrmCrudService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity) repo: Repository<ArticleEntity>
  ) {
    super(repo);
  }

  async createArticle(data: WriteArticleDTO) {
    const newArticle = await this.repo
      .create(_.pick(data, ["accountId", "title", "vol", "issue", "page", "year"]))
      .save()

    return newArticle;
  }
}
