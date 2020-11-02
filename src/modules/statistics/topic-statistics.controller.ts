import { Body, Controller, Post } from "@nestjs/common";
import { TopicStatisticsService } from "./topic-statistics.service";

@Controller("/statistics")
export class TopicStatisticsController {
   constructor(
      private topicStatisticsService: TopicStatisticsService
   ) { }

   @Post("/articles")
   async getArticleStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getArticleStatistics(articleIdArray);
   }

   @Post("/cost-benefit")
   async getCostBenefitStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getCostBenefitStatistics(articleIdArray);
   }

   @Post("/cost-effectiveness")
   async getCostEffectivenessStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getCostEffectivenessStatistics(articleIdArray);
   }

   @Post("/quality-of-lives")
   async getQualityOfLifeStatistics(
      @Body("articleIdArray") articleIdArray: number[]
   ): Promise<any> {
      return await this.topicStatisticsService.getQualityOfLifeStatistics(articleIdArray);
   }
}