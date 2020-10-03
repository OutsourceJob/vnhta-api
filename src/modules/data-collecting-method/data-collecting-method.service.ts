import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { DataCollectingMethodEntity } from './data-collecting-method.entity';

@Injectable()
export class DataCollectingMethodService extends TypeOrmCrudService<
  DataCollectingMethodEntity
> {
  constructor(
    @InjectRepository(DataCollectingMethodEntity)
    repo: Repository<DataCollectingMethodEntity>,
  ) {
    super(repo);
  }
}
