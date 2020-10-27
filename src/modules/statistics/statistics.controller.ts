import { Controller, Get, Query, Post, Body } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";

@Controller("/statistics")
export class StatisticsController {
  constructor(
    private statisticsService: StatisticsService
  ) { }

  @Post("/years")
  getYearStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getYearStatistics(articleIdArray);
  }

  @Post("/pathologies")
  getPathologyStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getPathologyStatistics(articleIdArray);
  }

  @Post("/journals")
  getJournalStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getJournalStatistics(articleIdArray);
  }

  @Post("/languages")
  getLanguageStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getLanguageStatistics(articleIdArray);
  }

  @Post("/icd20s")
  getIcd20Statistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getIcd20Statistics(articleIdArray);
  }

  @Post("/interventions")
  getInterventionStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getInterventionStatistics(articleIdArray);
  }

  @Post("/study-locations")
  getStudyLocationStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getStudyLocationStatistics(articleIdArray);
  }

  @Post("/study-designs")
  getStudyDesignStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getStudyDesignStatistics(articleIdArray);
  }

  @Post("/data-collecting-methods")
  getDataCollectingMethodStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getDataCollectingMethodStatistics(articleIdArray);
  }

  @Post("/sample-sizes")
  getSampleSizeStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getSampleSizeStatistics(articleIdArray);
  }

  @Post("/sampling-methods")
  getSamplingMethodStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getSamplingMethodStatistics(articleIdArray);
  }

  @Post("/cost-types")
  getCostTypeStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCostTypeStatistics(articleIdArray);
  }

  @Post("/cost-components")
  getCostComponentStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCostComponentStatistics(articleIdArray);
  }

  @Post("/year-of-costs")
  getYearOfCostStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getYearOfCostStatistics(articleIdArray);
  }

  @Post("/study-perspectives")
  getStudyPerspectiveStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getStudyPerspectiveStatistics(articleIdArray);
  }

  @Post("/ql-pathologies")
  getQLPathologyStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLPathologyStatistics(articleIdArray);
  }

  @Post("/ql-icd20s")
  getQLIcd20Statistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLIcd20Statistics(articleIdArray);
  }

  @Post("/ql-interventions")
  getQLInterventionStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLInterventionStatistics(articleIdArray);
  }

  @Post("/ql-study-locations")
  getQLStudyLocationStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLStudyLocationStatistics(articleIdArray);
  }

  @Post("/ql-study-designs")
  getQLStudyDesignStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLStudyDesignStatistics(articleIdArray);
  }

  @Post("/ql-data-collecting-methods")
  getQLDataCollectingMethodStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLDataCollectingMethodStatistics(articleIdArray);
  }

  @Post("/ql-sample-sizes")
  getQLSampleSizeStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLSampleSizeStatistics(articleIdArray);
  }

  @Post("/ql-sampling-methods")
  getQLSamplingMethodStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getQLSamplingMethodStatistics(articleIdArray);
  }

  @Post("/ce-pathologies")
  getCEPathologyStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEPathologyStatistics(articleIdArray);
  }

  @Post("/ce-icd20s")
  getCEIcd20Statistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEIcd20Statistics(articleIdArray);
  }

  @Post("/ce-interventions")
  getCEInterventionStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEInterventionStatistics(articleIdArray);
  }

  @Post("/ce-comparators")
  getCEComparatorStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEComparatorStatistics(articleIdArray);
  }

  @Post("/ce-outcomes")
  getCEOutcomeStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEOutcomeStatistics(articleIdArray);
  }

  @Post("/ce-study-locations")
  getCEStudyLocationStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEStudyLocationStatistics(articleIdArray);
  }

  @Post("/ce-study-designs")
  getCEStudyDesignStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEStudyDesignStatistics(articleIdArray);
  }

  @Post("/ce-analysis-methods")
  getCEAnalysisMethodStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEAnalysisMethodStatistics(articleIdArray);
  }

  @Post("/ce-model-types")
  getCEModelTypeStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEModelTypeStatistics(articleIdArray);
  }

  @Post("/ce-study-perspectives")
  getCEStudyPerspectiveStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEStudyPerspectiveStatistics(articleIdArray);
  }

  @Post("/ce-data-collecting-methods")
  getCEEffectivenessDataCollectingMethodStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEEffectivenessDataCollectingMethodStatistics(articleIdArray);
  }

  @Post("/ce-effectiveness-types")
  getCETypeOfEffectivenessStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCETypeOfEffectivenessStatistics(articleIdArray);
  }

  @Post("/ce-cost-components")
  getCECostComponentStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCECostComponentStatistics(articleIdArray);
  }

  @Post("/ce-year-of-costs")
  getCEYearOfCostStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEYearOfCostStatistics(articleIdArray);
  }

  @Post("/heterogeneity-analysis")
  getCEHeterogeneityAnalysisStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEHeterogeneityAnalysisStatistics(articleIdArray);
  }

  @Post("/uncertainty-analysis-methods")
  getCEUncertaintyAnalysisMethodStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEUncertaintyAnalysisMethodStatistics(articleIdArray);
  }

  @Post("/uncertainty-analysis-results")
  getCEUncertaintyAnalysisResultStatistics(
    @Body("articleIdArray") articleIdArray: number[]
  ) {
    return this.statisticsService.getCEUncertaintyAnalysisResultStatistics(articleIdArray);
  }
}