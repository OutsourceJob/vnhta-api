import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository, Connection } from "typeorm";
import { CostEffectivenessEntity } from "./cost-effectiveness.entity";
import { InterventionService } from '../../catalog/intervention/intervention.service';
import { StudyLocationService } from '../../catalog/study-location/study-location.service';
import { WriteCostEffectivenessDTO } from "./cost-effectiveness.dto";
import * as _ from "lodash";
import { ComparatorService } from "src/modules/catalog/comparator/comparator.service";
import { OutcomeService } from "src/modules/catalog/outcome/outcome.service";
import { ModelTypeService } from "src/modules/catalog/model-type/model-type.service";
import { HeterogeneityAnalysisService } from "src/modules/catalog/heterogeneity-analysis/heterogeneity-analysis.service";
import { UncertaintyAnalysisService } from "src/modules/catalog/uncertainty-analysis-method/uncertainty-analysis-method.service";
import { UncertaintyAnalysisResultService } from "src/modules/catalog/uncertainty-analysis-result/uncertainty-analysis-result.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { TableService } from '../../catalog/table/table.service';

@Injectable()
export class CostEffectivenessService extends TypeOrmCrudService<CostEffectivenessEntity> {
   constructor(
      @InjectRepository(CostEffectivenessEntity) repo: Repository<CostEffectivenessEntity>,
      private interventionService: InterventionService,
      private comparatorService: ComparatorService,
      private outcomeService: OutcomeService,
      private studyLocationService: StudyLocationService,
      private modelTypeService: ModelTypeService,
      private heterogeneityAnalysisService: HeterogeneityAnalysisService,
      private uncertaintyAnalysisService: UncertaintyAnalysisService,
      private uncertaintyAnalysisResultService: UncertaintyAnalysisResultService,
      private connection: Connection,
      private tableService: TableService
   ) {
      super(repo);
   }

   async createCostEffectiveness(data: WriteCostEffectivenessDTO): Promise<CostEffectivenessEntity> {
      const interventionIdArray = _.get(data, "interventionIdArray", []);
      const comparatorIdArray = _.get(data, "comparatorIdArray", []);
      const outcomeIdArray = _.get(data, "outcomeIdArray", []);
      const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);
      const modelTypeIdArray = _.get(data, "modelTypeIdArray", []);
      const heterogeneityAnalysisIdArray = _.get(data, "heterogeneityAnalysisIdArray", []);
      const uncertaintyAnalysisMethodIdArray = _.get(data, "uncertaintyAnalysisMethodIdArray", []);
      const uncertaintyAnalysisResultIdArray = _.get(data, "uncertaintyAnalysisResultIdArray", []);

      const interventions = await this.interventionService.findInterventionByIdArray(interventionIdArray);
      const comparators = await this.comparatorService.findComparatorByIdArray(comparatorIdArray);
      // const outcomes = await this.outcomeService.findOutcomeByIdArray(outcomeIdArray);
      const studyLocations = await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray);
      // const modelTypes = await this.modelTypeService.findModelTypeByIdArray(modelTypeIdArray);
      const heterogeneityAnalysis = await this.heterogeneityAnalysisService.findHeterogeneityAnalysisByIdArray(heterogeneityAnalysisIdArray);
      const uncertaintyAnalysisMethods = await this.uncertaintyAnalysisService.findUncertaintyAnalysisByIdArray(uncertaintyAnalysisMethodIdArray);
      const uncertaintyAnalysisResults = await this.uncertaintyAnalysisResultService.findUncertaintyAnalysisResultByIdArray(uncertaintyAnalysisResultIdArray);

      // const baseCaseTable = await this.tableService.createTable({
      //    name: "Base case result",
      //    parameterCodeArray: ["cost", "effectiveness", "icer", "icer_result"]
      // })

      const newCostEffectiveness = await this.repo
         .create({
            articleId: data.articleId,
            interventions,
            comparators,
            outcomeIdArray,
            studyLocations,
            modelTypeIdArray,
            heterogeneityAnalysis,
            uncertaintyAnalysisMethods,
            uncertaintyAnalysisResults,
            // baseCaseTableId: baseCaseTable.id
         })
         .save()

      return await this.getCostEffectivenessById(newCostEffectiveness.id);
   }

   async getCostEffectivenessById(costEffectivenessId: number) {
      let costEffectiveness = await this.connection
         .getRepository(CostEffectivenessEntity)
         .createQueryBuilder("cost_effectiveness")
         .leftJoinAndSelect("cost_effectiveness.interventions", "intervention")
         .leftJoinAndSelect("cost_effectiveness.comparators", "comparator")
         // .leftJoinAndSelect("cost_effectiveness.outcomes", "outcome")
         .leftJoinAndSelect("cost_effectiveness.studyLocations", "study_location")
         // .leftJoinAndSelect("cost_effectiveness.modelTypes", "model_type")
         // .leftJoinAndSelect("cost_effectiveness.heterogeneityAnalysis", "heterogeneity_analysis")
         .leftJoinAndSelect("cost_effectiveness.uncertaintyAnalysisMethods", "uncertainty_analysis")
         // .leftJoinAndSelect("cost_effectiveness.uncertaintyAnalysisResults", "uncertainty_analysis_result")
         .where("cost_effectiveness.id = :id", { id: costEffectivenessId })
         .getOne()

      if (!costEffectiveness) throw new NotFoundException("Cost Effectiveness Not Found")

      _.assign(costEffectiveness, {
         interventionIdArray: _.map(costEffectiveness.interventions, "id"),
         comparatorIdArray: _.map(costEffectiveness.comparators, "id"),
         // outcomeIdArray: _.map(costEffectiveness.outcomes, "id"),
         studyLocationIdArray: _.map(costEffectiveness.studyLocations, "id"),
         // modelTypeIdArray: _.map(costEffectiveness.modelTypes, "id"),
         // heterogeneityAnalysisIdArray: _.map(costEffectiveness.heterogeneityAnalysis, "id"),
         uncertaintyAnalysisMethodIdArray: _.map(costEffectiveness.uncertaintyAnalysisMethods, "id"),
         // uncertaintyAnalysisResultIdArray: _.map(costEffectiveness.uncertaintyAnalysisResults, "id"),
         interventions: undefined,
         comparators: undefined,
         // outcomes: undefined,
         studyLocations: undefined,
         // modelTypes: undefined,
         // heterogeneityAnalysis: undefined,
         uncertaintyAnalysisMethods: undefined,
         // uncertaintyAnalysisResults: undefined
      })

      return costEffectiveness;
   }

   async updateCostEffectivenessById(costEffectivenessId: number, data: WriteCostEffectivenessDTO) {
      const costEffectiveness = await this.repo.findOne(costEffectivenessId);
      if (!costEffectiveness) throw new NotFoundException("Cost Effectiveness Not Found")

      const interventionIdArray = _.get(data, "interventionIdArray");
      const comparatorIdArray = _.get(data, "comparatorIdArray");
      // const outcomeIdArray = _.get(data, "outcomeIdArray");
      const studyLocationIdArray = _.get(data, "studyLocationIdArray");
      // const modelTypeIdArray = _.get(data, "modelTypeIdArray");
      const heterogeneityAnalysisIdArray = _.get(data, "heterogeneityAnalysisIdArray");
      const uncertaintyAnalysisMethodIdArray = _.get(data, "uncertaintyAnalysisMethodIdArray");
      const uncertaintyAnalysisResultIdArray = _.get(data, "uncertaintyAnalysisResultIdArray");

      const interventions = interventionIdArray && await this.interventionService.findInterventionByIdArray(interventionIdArray);
      const comparators = comparatorIdArray && await this.comparatorService.findComparatorByIdArray(comparatorIdArray);
      // const outcomes = outcomeIdArray && await this.outcomeService.findOutcomeByIdArray(outcomeIdArray);
      const studyLocations = studyLocationIdArray && await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray);
      // const modelTypes = modelTypeIdArray && await this.modelTypeService.findModelTypeByIdArray(modelTypeIdArray);
      const heterogeneityAnalysis = heterogeneityAnalysisIdArray && await this.heterogeneityAnalysisService.findHeterogeneityAnalysisByIdArray(heterogeneityAnalysisIdArray);
      const uncertaintyAnalysisMethods = uncertaintyAnalysisMethodIdArray && await this.uncertaintyAnalysisService.findUncertaintyAnalysisByIdArray(uncertaintyAnalysisMethodIdArray);
      const uncertaintyAnalysisResults = uncertaintyAnalysisResultIdArray && await this.uncertaintyAnalysisResultService.findUncertaintyAnalysisResultByIdArray(uncertaintyAnalysisResultIdArray);

      _.assign(data, {
         interventions,
         comparators,
         // outcomes,
         studyLocations,
         // modelTypes,
         heterogeneityAnalysis,
         uncertaintyAnalysisMethods,
         uncertaintyAnalysisResults
      })

      _.chain(data)
         .omit([
            "interventionIdArray",
            "comparatorIdArray",
            // "outcomeIdArray",
            "studyLocationIdArray",
            // "modelTypeIdArray",
            "heterogeneityAnalysisIdArray",
            "uncertaintyAnalysisMethodIdArray",
            "uncertaintyAnalysisResultIdArray"
         ])
         .keys()
         .value()
         .forEach(key => {
            costEffectiveness[key] = data[key];
         })

      await costEffectiveness.save()

      return await this.getCostEffectivenessById(costEffectivenessId)
   }
}