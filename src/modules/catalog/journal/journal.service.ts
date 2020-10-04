import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { JournalEntity } from './journal.entity';

@Injectable()
export class JournalService extends TypeOrmCrudService<JournalEntity>{
  constructor(
    @InjectRepository(JournalEntity) repo: Repository<JournalEntity>,
  ) {
    super(repo);
  }

  async findJournalsByIdArray(journalIdArray: Array<number>): Promise<JournalEntity[]> {
    return await this.repo.findByIds(journalIdArray)
  }
}