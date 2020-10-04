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
import { ArticleJournalService } from '../catalog/journal/article-journal/article-journal.service';
import { JournalService } from '../catalog/journal/journal.service';

@Injectable()
export class ArticleService extends TypeOrmCrudService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity) repo: Repository<ArticleEntity>,
    private articleAuthorService: ArticleAuthorService,
    private articleJournalService: ArticleJournalService,
    private authorService: AuthorService,
    private journalService: JournalService,
    private connection: Connection
  ) {
    super(repo);
  }

  async createArticle(data: WriteArticleDTO): Promise<ArticleEntity> {
    const newArticle = await this.repo
      .create(_.pick(data, ["accountId", "title", "vol", "issue", "page", "year"]))
      .save()

    const authorIdArray = _.get(data, "authorIdArray", [])
    const journalIdArray = _.get(data, "journalIdArray", [])

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
    await this.articleJournalService.createArticleJournals(articleJournals)
    const journals = await this.journalService.findJournalsByIdArray(journalIdArray)
    _.set(newArticle, "relationships.journals", journals)



    /**
     * @todo quality of life
     */


    return newArticle;
  }

  async getArticleById(id: number): Promise<ArticleEntity> {
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
    const journals = await this.connection.query(
      `
        SELECT journal.* 
        FROM article
        INNER JOIN article_journal
          ON article_journal.article_id = article.id
        INNER JOIN journal
          ON journal.id = article_journal.journal_id
        WHERE article.id = ${id}
      `
    )

    _.set(foundArticle, "relationships.journals", journals);


    return foundArticle;
  }

  async updateArticleById(id: number, data: WriteArticleDTO): Promise<ArticleEntity> {
    const foundArticle = await this.repo.findOne(id);
    if (!foundArticle) if (!foundArticle) throw new NotFoundException("Article Not Found")

    const { accountId, title, vol, issue, page, year } = data;

    const authorIdArray = _.get(data, "authorIdArray", [])
    const journalIdArray = _.get(data, "journalIdArray", [])

    if (accountId) foundArticle.accountId = accountId;
    if (title) foundArticle.title = title;
    if (vol) foundArticle.vol = vol;
    if (issue) foundArticle.issue = issue;
    if (page) foundArticle.page = page;
    if (year) foundArticle.year = year;

    if (authorIdArray) {
      await this.connection.query(`DELETE FROM article_author WHERE article_id = ${id}`)
      const articleAuthors = _.map(authorIdArray, authorId => {
        return {
          authorId,
          articleId: foundArticle.id
        } as WriteArticleAuthorDTO
      })
      await this.articleAuthorService.createArticleAuthors(articleAuthors)
      const authors = await this.authorService.findAuthorsByIdArray(authorIdArray)
      _.set(foundArticle, "relationships.authors", authors)
    }

    if (journalIdArray) {
      await this.connection.query(`DELETE FROM article_journal WHERE article_id = ${id}`)
      const articleJournals = _.map(journalIdArray, journalId => {
        return {
          journalId,
          articleId: foundArticle.id
        }
      })
      await this.articleJournalService.createArticleJournals(articleJournals)
      const journals = await this.journalService.findJournalsByIdArray(journalIdArray)
      _.set(foundArticle, "relationships.journals", journals)
    }

    return foundArticle;
  }
}

// nest g mo modules/model-type/model-type --flat --no-spec
// nest g co modules/model-type/model-type --flat --no-spec
// nest g s modules/model-type/model-type --flat --no-spec