import { Injectable } from "@nestjs/common";
import { StatisticsService } from "./statistics.service"
import { Connection } from "typeorm";
import * as _ from "lodash";

@Injectable()
export class TopicStatisticsService {
  constructor(
    private statisticsService: StatisticsService,
    private connection: Connection
  ) { }

  async categorizeArticles(articleIdArray: number[]): Promise<any> {
    let res = await this.connection.query(`
      SELECT 
        article.id,
        cost_benefit.is_active AS cost_benefit_status,
        cost_effectiveness.is_active AS cost_effectiveness_status,
        quality_of_life.is_active AS quality_of_life_status
      FROM article
      LEFT JOIN cost_benefit ON cost_benefit.article_id = article.id
      LEFT JOIN cost_effectiveness ON cost_effectiveness.article_id = article.id
      LEFT JOIN quality_of_life ON quality_of_life.article_id = article.id
      WHERE 
      article.id IN (${_.toString(articleIdArray)})
    `)

    return {
      articleIdArray: articleIdArray,
      costBenefitIdArray: _.chain(res).filter("cost_benefit_status").map("id").value(),
      costEffectivenessIdArray: _.chain(res).filter("cost_effectiveness_status").map("id").value(),
      qualityOfLifeIdArray: _.chain(res).filter("quality_of_life_status").map("id").value()
    }
  }

  async getArticleStatistics(articleIdArray: number[]): Promise<any> {
    const years = await this.statisticsService.getYearStatistics(articleIdArray);
    const journals = await this.statisticsService.getJournalStatistics(articleIdArray);
    const languages = await this.statisticsService.getLanguageStatistics(articleIdArray);

    return { years, journals, languages }
  }

  async getCostBenefitStatistics(articleIdArray: number[]): Promise<any> {
    const pathologies = await this.statisticsService.getPathologyStatistics(articleIdArray);
    const icd20s = await this.statisticsService.getIcd20Statistics(articleIdArray);
    const interventions = await this.statisticsService.getInterventionStatistics(articleIdArray);
    const studyLocations = await this.statisticsService.getStudyLocationStatistics(articleIdArray);
    const studyDesigns = await this.statisticsService.getStudyDesignStatistics(articleIdArray);
    const dataCollectingMethods = await this.statisticsService.getDataCollectingMethodStatistics(articleIdArray);
    const sampleSizes = await this.statisticsService.getSampleSizeStatistics(articleIdArray);
    const samplingMethods = await this.statisticsService.getSamplingMethodStatistics(articleIdArray);
    const costTypes = await this.statisticsService.getCostTypeStatistics(articleIdArray);
    const costComponents = await this.statisticsService.getCostComponentStatistics(articleIdArray);
    const costYears = await this.statisticsService.getYearOfCostStatistics(articleIdArray);
    const studyPerspectives = await this.statisticsService.getStudyPerspectiveStatistics(articleIdArray);

    return {
      pathologies, icd20s, interventions, studyLocations, studyDesigns, dataCollectingMethods,
      sampleSizes, samplingMethods, costTypes, costComponents, costYears, studyPerspectives
    }
  }

  async getCostEffectivenessStatistics(articleIdArray: number[]): Promise<any> {
    const pathologies = await this.statisticsService.getCEPathologyStatistics(articleIdArray);
    const icd20s = await this.statisticsService.getCEIcd20Statistics(articleIdArray);
    const interventions = await this.statisticsService.getCEInterventionStatistics(articleIdArray);
    const comparators = await this.statisticsService.getCEComparatorStatistics(articleIdArray);
    const outcomes = await this.statisticsService.getCEOutcomeStatistics(articleIdArray);
    const studyLocations = await this.statisticsService.getCEStudyLocationStatistics(articleIdArray);
    const studyDesigns = await this.statisticsService.getCEStudyDesignStatistics(articleIdArray);
    const analysisMethods = await this.statisticsService.getCEAnalysisMethodStatistics(articleIdArray);
    const modelTypes = await this.statisticsService.getCEModelTypeStatistics(articleIdArray);
    const studyPerspectives = await this.statisticsService.getCEStudyPerspectiveStatistics(articleIdArray);
    const dataCollectingMethods = await this.statisticsService.getCEEffectivenessDataCollectingMethodStatistics(articleIdArray);
    const effectivenessTypes = await this.statisticsService.getCETypeOfEffectivenessStatistics(articleIdArray);
    const costComponents = await this.statisticsService.getCECostComponentStatistics(articleIdArray);
    const costYears = await this.statisticsService.getCEYearOfCostStatistics(articleIdArray);
    const heterogeneityAnalysis = await this.statisticsService.getCEHeterogeneityAnalysisStatistics(articleIdArray);
    const uncertaintyAnalysisMethods = await this.statisticsService.getCEUncertaintyAnalysisMethodStatistics(articleIdArray);
    const uncertaintyAnalysisResults = await this.statisticsService.getCEUncertaintyAnalysisResultStatistics(articleIdArray);

    return {
      pathologies, icd20s, interventions, comparators, outcomes, studyLocations, studyDesigns, analysisMethods, modelTypes,
      studyPerspectives, dataCollectingMethods, effectivenessTypes, costComponents, costYears, heterogeneityAnalysis,
      uncertaintyAnalysisMethods, uncertaintyAnalysisResults
    }
  }

  async getQualityOfLifeStatistics(articleIdArray: number[]): Promise<any> {
    const pathologies = await this.statisticsService.getQLPathologyStatistics(articleIdArray);
    const icd20s = await this.statisticsService.getQLIcd20Statistics(articleIdArray);
    const interventions = await this.statisticsService.getQLInterventionStatistics(articleIdArray);
    const studyLocations = await this.statisticsService.getQLStudyLocationStatistics(articleIdArray);
    const studyDesigns = await this.statisticsService.getQLStudyDesignStatistics(articleIdArray);
    const dataCollectingMethods = await this.statisticsService.getQLDataCollectingMethodStatistics(articleIdArray);
    const sampleSizes = await this.statisticsService.getQLSampleSizeStatistics(articleIdArray);
    const samplingMethods = await this.statisticsService.getQLSamplingMethodStatistics(articleIdArray);

    return {
      pathologies, icd20s, interventions, studyLocations, studyDesigns, dataCollectingMethods,
      sampleSizes, samplingMethods
    }
  }
}