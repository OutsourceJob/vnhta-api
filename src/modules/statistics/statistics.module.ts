import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";

@Module({
   exports: [StatisticsService],
   providers: [StatisticsService]
})
export class StatisticsModule { }