import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TableEntity } from "./table.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class TableService extends TypeOrmCrudService<TableEntity>{
  constructor(
    @InjectRepository(TableEntity) repo: Repository<TableEntity>,
  ) {
    super(repo);
  }

  async findTablesByIdArray(idArray: Array<number>): Promise<TableEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}