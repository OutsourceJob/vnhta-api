import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import * as _ from "lodash";
import { StudyLocationService } from '../../catalog/study-location/study-location.service';
import { WriteCostBenefitDTO } from './cost-benefit.dto';
import { InterventionService } from '../../catalog/intervention/intervention.service';
import { Connection } from "typeorm";

@Injectable()
export class CostBenefitService extends TypeOrmCrudService<CostBenefitEntity>{
  constructor(
    @InjectRepository(CostBenefitEntity) repo: Repository<CostBenefitEntity>,
    private studyLocationService: StudyLocationService,
    private interventionService: InterventionService,
    private connection: Connection
  ) {
    super(repo)
  }

  async createCostBenefit(data: WriteCostBenefitDTO) {
    const interventionIdArray = _.get(data, "interventionIdArray", []);
    const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);

    const interventions = await this.interventionService.findInterventionByIdArray(interventionIdArray);
    const studyLocations = await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray)

    const newCostBenefit = await this.repo
      .create({
        articleId: data.articleId,
        interventions,
        studyLocations
      })
      .save()

    return newCostBenefit;
  }

  async updateCostBenefitById(costBenefitId: number, data: WriteCostBenefitDTO) {
    const costBenefit = await this.repo.findOne(costBenefitId);
    if (!costBenefit) throw new NotFoundException("Cost Benefit Not Found")

    const interventionIdArray = _.get(data, "interventionIdArray", []);
    const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);

    const interventions = await this.interventionService.findInterventionByIdArray(interventionIdArray);
    const studyLocations = await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray)

    _.assign(data, { interventions, studyLocations })

    _.chain(data)
      .omit(["interventionIdArray", "studyLocationIdArray"])
      .keys()
      .value()
      .forEach(key => {
        costBenefit[key] = data[key];
      })

    return await costBenefit.save()
  }

  async getCostBenefitById(costBenefitId: number) {
    const costBenefits = await this.connection
      .getRepository(CostBenefitEntity)
      .createQueryBuilder("cost_benefit")
      .leftJoinAndSelect("cost_benefit.interventions", "intervention")
      .leftJoinAndSelect("cost_benefit.studyLocations", "study_location")
      .where("cost_benefit.id = :id", { id: costBenefitId })
      .getOne()

    return costBenefits;
  }
}