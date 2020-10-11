import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WriteArticleDTO } from './article.dto';
import * as _ from "lodash";
import { AuthorService } from '../catalog/author/author.service';
import { Connection } from "typeorm";
import { JournalService } from '../catalog/journal/journal.service';
import { CostBenefitService } from './cost-benefit/cost-benefit.service';
import { QualityOfLifeService } from './quality-of-life/quality-of-life.service';
import { CostEffectivenessService } from './cost-effectiveness/cost-effectiveness.service';

@Injectable()
export class ArticleService extends TypeOrmCrudService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity) repo: Repository<ArticleEntity>,
    private authorService: AuthorService,
    // private journalService: JournalService,
    private connection: Connection,
    private costBenefitService: CostBenefitService,
    private qualityOfLifeService: QualityOfLifeService,
    private costEffectivenessService: CostEffectivenessService
  ) {
    super(repo);
  }

  async createArticle(data: WriteArticleDTO): Promise<ArticleEntity> {
    const authorIdArray = _.get(data, "authorIdArray", [])
    // const journalIdArray = _.get(data, "journalIdArray", [])

    const authors = await this.authorService.findAuthorsByIdArray(authorIdArray)
    // const journals = await this.journalService.findJournalsByIdArray(journalIdArray)

    _.assign(data, { authors })

    const newArticle = await this.repo
      .create(data)
      .save()

    /**
    * @todo Cost Benefit
    */
    await this.costBenefitService.createCostBenefit({ articleId: newArticle.id });

    /**
    * @todo Quality Of Life
    */
    await this.qualityOfLifeService.createQualityOfLife({ articleId: newArticle.id });

    /**
    * @todo Cost Effectiveness
    */
    await this.costEffectivenessService.createCostEffectiveness({ articleId: newArticle.id });

    return newArticle;
  }

  async getArticleById(id: number): Promise<ArticleEntity> {
    const foundArticle = await this.connection
      .getRepository(ArticleEntity)
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.authors", "author")
      // .leftJoinAndSelect("article.journals", "journal")
      .leftJoinAndSelect("article.costBenefit", "cost_benefit")
      .leftJoinAndSelect("article.qualityOfLife", "quality_of_life")
      .leftJoinAndSelect("article.costEffectiveness", "cost_effectiveness")
      .where("article.id = :id", { id })
      .getOne()

    if (!foundArticle) throw new NotFoundException("Article Not Found")
    return foundArticle;
  }

  async updateArticleById(id: number, data: WriteArticleDTO): Promise<ArticleEntity> {
    const foundArticle = await this.repo.findOne(id);
    if (!foundArticle) if (!foundArticle) throw new NotFoundException("Article Not Found")

    const { accountId, title, vol, issue, number, startPage, endPage, year, authorIdArray, journalId } = data;

    if (accountId) foundArticle.accountId = accountId;
    if (title) foundArticle.title = title;
    if (vol) foundArticle.vol = vol;
    if (issue) foundArticle.issue = issue;
    if (number) foundArticle.number = number;
    if (startPage) foundArticle.startPage = startPage;
    if (endPage) foundArticle.endPage = endPage;
    if (year) foundArticle.year = year;
    if (journalId) foundArticle.journalId = journalId;

    if (authorIdArray && _.isArray(authorIdArray)) foundArticle.authors = await this.authorService.findAuthorsByIdArray(authorIdArray)
    // if (journalIdArray && _.isArray(journalIdArray)) foundArticle.journals = await this.journalService.findJournalsByIdArray(journalIdArray)

    return foundArticle.save();
  }

  async updateFulltext(articleId: number, fullTextUrl: string) {
    const article = await this.repo.findOne(articleId)
    if (!article) throw new NotFoundException("Article Not found")

    article.fullTextUrl = fullTextUrl
    return await article.save()
  }
}