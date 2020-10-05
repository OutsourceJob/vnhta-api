import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeterogeneityAnalysisEntity } from './heterogeneity-analysis.entity';
import { HeterogeneityAnalysisService } from './heterogeneity-analysis.service';
import { HeterogeneityAnalysisController } from './heterogeneity-analysis.controller';

@Module({
   imports: [TypeOrmModule.forFeature([HeterogeneityAnalysisEntity])],
   controllers: [HeterogeneityAnalysisController],
   providers: [HeterogeneityAnalysisService],
   exports: [HeterogeneityAnalysisService],
})
export class HeterogeneityAnalysisModule { }
