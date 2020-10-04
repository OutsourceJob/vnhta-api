import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class CostBenefitService extends TypeOrmCrudService<CostBenefitEntity>{
  constructor(
    @InjectRepository(CostBenefitEntity) repo: Repository<CostBenefitEntity>
  ) {
    super(repo)
  }

  async createCostBenefit(data: CostBenefitEntity) {

  }
}