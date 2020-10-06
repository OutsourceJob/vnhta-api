import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OutcomeEntity } from './outcome.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OutcomeService extends TypeOrmCrudService<OutcomeEntity> {
  constructor(
    @InjectRepository(OutcomeEntity) repo: Repository<OutcomeEntity>,
  ) {
    super(repo);
  }

  async findOutcomeByIdArray(idArray: number[]): Promise<OutcomeEntity[]> {
    return await this.repo.findByIds(idArray);
  }
}
