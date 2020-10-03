import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { QualityOfLifeToolkitEntity } from './quality-of-life-toolkit.entity';

@Injectable()
export class QualityOfLifeToolkitService extends TypeOrmCrudService<
  QualityOfLifeToolkitEntity
> {
  constructor(
    @InjectRepository(QualityOfLifeToolkitEntity)
    repo: Repository<QualityOfLifeToolkitEntity>,
  ) {
    super(repo);
  }
}
