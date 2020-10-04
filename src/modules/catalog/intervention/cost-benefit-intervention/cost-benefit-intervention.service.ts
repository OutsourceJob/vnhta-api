import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostBenefitInterventionEntity } from './cost-benefit-intervention.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { WriteCostBenefitInterventionDTO } from './cost-benefit-intervention.dto';

@Injectable()
export class CostBenefitInterventionService extends TypeOrmCrudService<CostBenefitInterventionEntity>{
  constructor(
    @InjectRepository(CostBenefitInterventionEntity) repo: Repository<CostBenefitInterventionEntity>
  ) {
    super(repo);
  }

  async createCostBenefitIntervention(data: WriteCostBenefitInterventionDTO): Promise<CostBenefitInterventionEntity> {
    return await this.repo.create(data).save();
  }

  async createCostBenefitInterventions(data: WriteCostBenefitInterventionDTO[]): Promise<CostBenefitInterventionEntity[]> {
    return await this.repo.save(
      this.repo.create(data)
    )
  }
}