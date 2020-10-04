import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import * as _ from "lodash";

@Injectable()
export class CostBenefitService extends TypeOrmCrudService<CostBenefitEntity>{
  constructor(
    @InjectRepository(CostBenefitEntity) repo: Repository<CostBenefitEntity>
  ) {
    super(repo)
  }

  async createCostBenefit(data: CostBenefitEntity) {
    const interventionIdArray = _.get(data, "interventionIdArray", []);
    const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);


    const newCostBenefit = await this.repo
      .create(data)
      .save()
  }

  /**
   * @todo  
   */
}