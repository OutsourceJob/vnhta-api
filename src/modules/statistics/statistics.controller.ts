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
}