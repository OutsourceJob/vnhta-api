import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AuthorEntity } from './author.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService extends TypeOrmCrudService<AuthorEntity>{
  constructor(
    @InjectRepository(AuthorEntity) repo: Repository<AuthorEntity>,
  ) {
    super(repo);
  }

  async findAuthorsByIdArray(authorIdArray: Array<number>): Promise<AuthorEntity[]> {
    return await this.repo.findByIds(authorIdArray)
  }
}