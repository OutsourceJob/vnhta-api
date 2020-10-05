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
import { PathologyEntity } from 'src/modules/catalog/pathology/pathology.entity';

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

    return await this.getCostBenefitById(newCostBenefit.id)
    // return newCostBenefit;
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

    await costBenefit.save()

    return await this.getCostBenefitById(costBenefitId)
  }

  async getCostBenefitById(costBenefitId: number) {
    let costBenefit = await this.connection
      .getRepository(CostBenefitEntity)
      .createQueryBuilder("cost_benefit")
      .leftJoinAndSelect("cost_benefit.interventions", "intervention")
      .leftJoinAndSelect("cost_benefit.studyLocations", "study_location")
      .leftJoinAndSelect("cost_benefit.pathologyId", "pathology", "cost_benefit.pathology_id = pathology.id")
      .leftJoinAndSelect("cost_benefit.icd20Id", "icd_20", "cost_benefit.icd_20_id = icd_20.id")
      .leftJoinAndSelect("cost_benefit.studyDesignId", "study_design", "cost_benefit.study_design_id = study_design.id")
      .leftJoinAndSelect("cost_benefit.dataCollectingMethodId", "data_collecting_method", "cost_benefit.data_collecting_method_id = data_collecting_method.id")
      .leftJoinAndSelect("cost_benefit.sampleSizeId", "sample_size", "cost_benefit.sample_size_id = cost_benefit.id")
      .leftJoinAndSelect("cost_benefit.samplingMethodId", "sampling_method", "cost_benefit.sampling_method_id = sampling_method.id")
      .leftJoinAndSelect("cost_benefit.costTypeId", "cost_type", "cost_benefit.cost_type_id = cost_type.id")
      .leftJoinAndSelect("cost_benefit.costComponentId", "cost_component", "cost_benefit.cost_component_id = cost_component.id")
      .leftJoinAndSelect("cost_benefit.studyPerspectiveId", "study_perspective", "cost_benefit.study_perspective_id = study_perspective.id")
      .where("cost_benefit.id = :id", { id: costBenefitId })
      .getOne()

    if (!costBenefit) throw new NotFoundException("Cost Benefit Not Found")

    return _.chain(costBenefit)
      .assign({
        interventionIdArray: _.map(costBenefit.interventions, "id"),
        studyLocationIdArray: _.map(costBenefit.studyLocations, "id"),
        pathologyId: _.get(costBenefit, "pathologyId.id", null),
        icd20Id: _.get(costBenefit, "icd20Id.id", null),
        studyDesignId: _.get(costBenefit, "studyDesignId.id", null),
        dataCollectingMethodId: _.get(costBenefit, "dataCollectingMethodId.id", null),
        sampleSizeId: _.get(costBenefit, "sampleSizeId.id", null),
        samplingMethodId: _.get(costBenefit, "samplingMethodId.id", null),
        costTypeId: _.get(costBenefit, "costTypeId.id", null),
        costComponentId: _.get(costBenefit, "costComponentId.id", null),
        studyPerspectiveId: _.get(costBenefit, "studyPerspectiveId.id", null),
      })
      .pick([
        "isActive",
        "pathologyId", "icd20Id",
        "interventionIdArray", "studyLocationIdArray",
        "studyDesignId", "dataCollectingMethodId",
        "sampleSizeId", "inclusionCriteria", "exclusiveCriteria", "samplingMethodId",
        "costTypeId", "costComponentId", "studyPerspectiveId"
      ])
      .value()

  }
}