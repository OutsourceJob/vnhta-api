import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { StatisticsController } from "./statistics.controller";
import { TopicStatisticsService } from "./topic-statistics.service";
import { TopicStatisticsController } from "./topic-statistics.controller";

@Module({
   controllers: [StatisticsController, TopicStatisticsController],
   exports: [StatisticsService, TopicStatisticsService],
   providers: [StatisticsService, TopicStatisticsService]
})
export class StatisticsModule { }