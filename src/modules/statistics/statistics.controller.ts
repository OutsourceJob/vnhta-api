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
}