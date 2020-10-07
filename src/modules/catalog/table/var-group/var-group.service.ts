import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { VarGroupEntity } from "./var-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class VarGroupService extends TypeOrmCrudService<VarGroupEntity>{
  constructor(
    @InjectRepository(VarGroupEntity) repo: Repository<VarGroupEntity>,
  ) {
    super(repo);
  }

  async findVarGroupsByIdArray(idArray: Array<number>): Promise<VarGroupEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}