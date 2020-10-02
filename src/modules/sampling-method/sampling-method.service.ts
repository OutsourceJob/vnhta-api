import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { SamplingMethodEntity } from './sampling-method.entity';

@Injectable()
export class SamplingMethodService extends TypeOrmCrudService<
  SamplingMethodEntity
> {
  constructor(
    @InjectRepository(SamplingMethodEntity)
    repo: Repository<SamplingMethodEntity>,
  ) {
    super(repo);
  }
}
