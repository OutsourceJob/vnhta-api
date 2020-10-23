import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { StatisticsController } from "./statistics.controller";

@Module({
   controllers: [StatisticsController],
   exports: [StatisticsService],
   providers: [StatisticsService]
})
export class StatisticsModule { }