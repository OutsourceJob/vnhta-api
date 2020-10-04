import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostComponentEntity } from './cost-component.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class CostComponentService extends TypeOrmCrudService<CostComponentEntity>{
  constructor(
    @InjectRepository(CostComponentEntity) repo: Repository<CostComponentEntity>,
  ) {
    super(repo);
  }

  async findCostComponentsByIdArray(idArray: Array<number>): Promise<CostComponentEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}