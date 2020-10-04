import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import * as _ from "lodash";
import { StudyLocationService } from '../../catalog/study-location/study-location.service';
import { WriteCostBenefitDTO } from './cost-benefit.dto';

@Injectable()
export class CostBenefitService extends TypeOrmCrudService<CostBenefitEntity>{
  constructor(
    @InjectRepository(CostBenefitEntity) repo: Repository<CostBenefitEntity>,
    private studyLocationService: StudyLocationService
  ) {
    super(repo)
  }

  async createCostBenefit(data: WriteCostBenefitDTO) {
    const interventionIdArray = _.get(data, "interventionIdArray", []);
    const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);

    const studyLocations = await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray)

    const newCostBenefit = await this.repo
      .create({
        articleId: data.articleId,
        studyLocations
      })
      .save()

    return newCostBenefit;
  }
}