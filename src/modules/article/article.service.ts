import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WriteArticleDTO } from './article.dto';
import * as _ from "lodash";
import { ArticleAuthorService } from '../author/article-author/article-author.service';
import { WriteArticleAuthorDTO } from '../author/article-author/article-author.dto';
import { AuthorService } from '../author/author.service';
import { Connection } from "typeorm";

@Injectable()
export class ArticleService extends TypeOrmCrudService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity) repo: Repository<ArticleEntity>,
    private articleAuthorService: ArticleAuthorService,
    private authorService: AuthorService,
    private connection: Connection
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
    const authors = await this.authorService.findAuthorsByIdArray(authorIdArray)

    _.set(newArticle, "relationships.authors", authors)

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

  async getArticleById(id: number) {
    const foundArticle = await this.repo.findOne(id)
    if (!foundArticle) throw new NotFoundException("Article Not Found")

    /**
     * @todo  include authors
     */
    const authors = await this.connection.query(
      `
        SELECT author.* 
        FROM article
        INNER JOIN article_author
          ON article_author.article_id = article.id
        INNER JOIN author
          ON author.id = article_author.author_id
        WHERE article.id = ${id}
      `
    )

    _.set(foundArticle, "relationships.authors", authors);

    /**
     * @todo  include journals
     */


    return foundArticle;
  }
}
