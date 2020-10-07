import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RowEntity } from './row.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class RowService extends TypeOrmCrudService<RowEntity>{
  constructor(
    @InjectRepository(RowEntity) repo: Repository<RowEntity>,
  ) {
    super(repo);
  }

  async findRowsByIdArray(idArray: Array<number>): Promise<RowEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}