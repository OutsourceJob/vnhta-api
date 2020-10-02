import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AuthorEntity } from './author.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { ArticleAuthorEntity } from './article-author/article-author.entity';

@Injectable()
export class AuthorService extends TypeOrmCrudService<AuthorEntity>{
  constructor(
    @InjectRepository(AuthorEntity) repo: Repository<AuthorEntity>,
  ) {
    super(repo);
  }
}