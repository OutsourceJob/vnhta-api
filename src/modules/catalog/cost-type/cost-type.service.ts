import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostTypeEntity } from './cost-type.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class CostTypeService extends TypeOrmCrudService<CostTypeEntity>{
  constructor(
    @InjectRepository(CostTypeEntity) repo: Repository<CostTypeEntity>,
  ) {
    super(repo);
  }

  async findCostTypesByIdArray(idArray: Array<number>): Promise<CostTypeEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}