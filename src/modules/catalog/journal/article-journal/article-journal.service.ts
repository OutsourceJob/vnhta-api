import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleJournalEntity } from './article-journal.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { WriteArticleJournalDTO } from "./article-journal.dto";

@Injectable()
export class ArticleJournalService extends TypeOrmCrudService<ArticleJournalEntity>{
  constructor(
    @InjectRepository(ArticleJournalEntity) repo: Repository<ArticleJournalEntity>
  ) {
    super(repo);
  }

  async createArticleJournal(data: WriteArticleJournalDTO): Promise<ArticleJournalEntity> {
    return await this.repo.create(data).save()
  }

  async createArticleJournals(data: Array<WriteArticleJournalDTO>): Promise<ArticleJournalEntity[]> {
    return await this.repo.save(
      this.repo.create(data)
    )
  }
}