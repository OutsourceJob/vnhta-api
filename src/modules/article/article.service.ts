import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WriteArticleDTO } from './article.dto';
import * as _ from "lodash";
import { ArticleAuthorService } from '../author/article-author/article-author.service';
import { WriteArticleAuthorDTO } from '../author/article-author/article-author.dto';

@Injectable()
export class ArticleService extends TypeOrmCrudService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity) repo: Repository<ArticleEntity>,
    private articleAuthorService: ArticleAuthorService
  ) {
    super(repo);
  }

  async createArticle(data: WriteArticleDTO) {
    const newArticle = await this.repo
      .create(_.pick(data, ["accountId", "title", "vol", "issue", "page", "year"]))
      .save()

    const { authorIdArray, journalIdArray } = data;

    /**
     * @todo  create article_author records
     */
    const articleAuthors = _.map(authorIdArray, authorId => {
      return {
        authorId,
        articleId: newArticle.id
      } as WriteArticleAuthorDTO
    })
    await this.articleAuthorService.createArticleAuthors(articleAuthors)

    /**
     * @todo  create article_journal records
     */
    const articleJournals = _.map(journalIdArray, journalId => {
      return {
        journalId,
        articleId: newArticle.id
      }
    })

    return newArticle;
  }
}
