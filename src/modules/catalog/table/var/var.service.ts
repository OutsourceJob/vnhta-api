import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { VarEntity } from "./var.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class VarService extends TypeOrmCrudService<VarEntity>{
  constructor(
    @InjectRepository(VarEntity) repo: Repository<VarEntity>,
  ) {
    super(repo);
  }

  async findVarsByIdArray(idArray: Array<number>): Promise<VarEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}