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
}