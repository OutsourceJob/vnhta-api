import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleAuthorEntity } from './article-author.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class ArticleAuthorService extends TypeOrmCrudService<ArticleAuthorEntity>{
  constructor(
    @InjectRepository(ArticleAuthorEntity) repo: Repository<ArticleAuthorEntity>
  ) {
    super(repo);
  }
}