import { Body, Controller, Get, Post } from "@nestjs/common";
import { TopicStatisticsService } from "./topic-statistics.service";

@Controller("/statistics")
export class TopicStatisticsController {
   constructor(
      private topicStatisticsService: TopicStatisticsService
   ) { }

   @Get("/articles")
   async getArticleStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getArticleStatistics(articleIdArray);
   }

   @Get("/cost-benefit")
   async getCostBenefitStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getCostBenefitStatistics(articleIdArray);
   }

   @Get("/cost-effectiveness")
   async getCostEffectivenessStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getCostEffectivenessStatistics(articleIdArray);
   }

   @Get("/quality-of-lives")
   async getQualityOfLifeStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getQualityOfLifeStatistics(articleIdArray);
   }
}