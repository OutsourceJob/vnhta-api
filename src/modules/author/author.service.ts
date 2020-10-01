import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AuthorEntity } from './author.entity';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthorService extends TypeOrmCrudService<AuthorEntity>{
  constructor(
    @InjectRepository(AuthorEntity) repo
  ) {
    super(repo);
  }
}