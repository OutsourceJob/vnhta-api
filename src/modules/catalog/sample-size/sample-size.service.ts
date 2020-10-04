import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { SampleSizeEntity } from './sample-size.entity';

@Injectable()
export class SampleSizeService extends TypeOrmCrudService<SampleSizeEntity> {
  constructor(
    @InjectRepository(SampleSizeEntity)
    repo: Repository<SampleSizeEntity>,
  ) {
    super(repo);
  }
}
