import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection } from 'typeorm';
import * as _ from "lodash";
import { StudyLocationService } from '../../catalog/study-location/study-location.service';
import { WriteCostBenefitDTO } from './cost-benefit.dto';
import { InterventionService } from '../../catalog/intervention/intervention.service';
import { TableService } from '../../catalog/table/table.service';

@Injectable()
export class CostBenefitService extends TypeOrmCrudService<CostBenefitEntity>{
  constructor(
    @InjectRepository(CostBenefitEntity) repo: Repository<CostBenefitEntity>,
    private studyLocationService: StudyLocationService,
    private interventionService: InterventionService,
    private connection: Connection,
    private tableService: TableService
  ) {
    super(repo)
  }

  async createCostBenefit(data: WriteCostBenefitDTO) {
    const interventionIdArray = _.get(data, "interventionIdArray", []);
    const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);

    const interventions = await this.interventionService.findInterventionByIdArray(interventionIdArray);
    const studyLocations = await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray)

    const qualitativeTable = await this.tableService.createTable({ name: "Qualitative Characteristics", parameterCodeArray: ["n", "percent"] })
    const quantitativeTable = await this.tableService.createTable({
      name: "Quantitative Characteristics",
      parameterCodeArray: ["mean", "median", "sd", "se", "min", "max", "iqr_25", "iqr_75"]
    })
    const costTable = await this.tableService.createTable({
      name: "Cost",
      parameterCodeArray: ["mean", "median", "sd", "se", "min", "max", "iqr_25", "iqr_75"]
    })
    const qualitativeFactorTable = await this.tableService.createTable({
      name: "Qualitative Factor",
      parameterCodeArray: ["test", "mean_diff", "lower_95", "upper_95"]
    })
    const quantitativeFactorTable = await this.tableService.createTable({
      name: "Quantitative Factor",
      parameterCodeArray: ["p_value", "test_value"]
    })

    const newCostBenefit = await this.repo
      .create({
        articleId: data.articleId,
        interventions,
        studyLocations,
        qualitativeTableId: qualitativeTable.id,
        quantitativeTableId: quantitativeTable.id,
        costTableId: costTable.id,
        qualitativeFactorTableId: qualitativeFactorTable.id,
        quantitativeFactorTableId: quantitativeFactorTable.id
      })
      .save()

    return await this.getCostBenefitById(newCostBenefit.id)
  }

  async updateCostBenefitById(costBenefitId: number, data: WriteCostBenefitDTO) {
    const costBenefit = await this.repo.findOne(costBenefitId);
    if (!costBenefit) throw new NotFoundException("Cost Benefit Not Found")

    const interventionIdArray = _.get(data, "interventionIdArray");
    const studyLocationIdArray = _.get(data, "studyLocationIdArray");

    const interventions = data.interventionIdArray && await this.interventionService.findInterventionByIdArray(interventionIdArray)
    const studyLocations = data.studyLocationIdArray && await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray)

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
      .where("cost_benefit.id = :id", { id: costBenefitId })
      .getOne()

    if (!costBenefit) throw new NotFoundException("Cost Benefit Not Found")

    _.assign(costBenefit, {
      interventionIdArray: _.map(costBenefit.interventions, "id"),
      studyLocationIdArray: _.map(costBenefit.studyLocations, "id"),
      interventions: undefined,
      studyLocations: undefined
    })

    return costBenefit
  }
}