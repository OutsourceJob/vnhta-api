import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { QualityOfLifeEntity } from './quality-of-life.entity';

export class QualityOfLifeService extends TypeOrmCrudService<QualityOfLifeEntity> {
  constructor(
    @InjectRepository(QualityOfLifeEntity)
    repo: Repository<QualityOfLifeEntity>,
  ) {
    super(repo);
  }
}
