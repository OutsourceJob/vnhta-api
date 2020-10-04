import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleAuthorEntity } from './article-author.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { WriteArticleAuthorDTO } from "./article-author.dto";

@Injectable()
export class ArticleAuthorService extends TypeOrmCrudService<ArticleAuthorEntity>{
  constructor(
    @InjectRepository(ArticleAuthorEntity) repo: Repository<ArticleAuthorEntity>
  ) {
    super(repo);
  }

  async createArticleAuthor(data: WriteArticleAuthorDTO): Promise<ArticleAuthorEntity> {
    return await this.repo.create(data).save()
  }

  async createArticleAuthors(data: Array<WriteArticleAuthorDTO>): Promise<ArticleAuthorEntity[]> {
    return await this.repo.save(
      this.repo.create(data)
    )
  }
}