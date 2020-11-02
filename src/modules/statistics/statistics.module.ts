import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { StatisticsController } from "./statistics.controller";
import { TopicStatisticsService } from "./topic-statistics.service";

@Module({
   controllers: [StatisticsController],
   exports: [StatisticsService, StatisticsService],
   providers: [StatisticsService, TopicStatisticsService]
})
export class StatisticsModule { }