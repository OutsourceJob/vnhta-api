import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PathologyEntity } from './pathology.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class PathologyService extends TypeOrmCrudService<PathologyEntity>{
  constructor(
    @InjectRepository(PathologyEntity) repo: Repository<PathologyEntity>,
  ) {
    super(repo);
  }
}