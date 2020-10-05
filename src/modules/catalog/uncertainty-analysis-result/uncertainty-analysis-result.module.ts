import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UncertaintyAnalysisResultEntity } from './uncertainty-analysis-result.entity';
import { UncertaintyAnalysisResultService } from './uncertainty-analysis-result.service';
import { UncertaintyAnalysisResultController } from './uncertainty-analysis-result.controller';

@Module({
   imports: [TypeOrmModule.forFeature([UncertaintyAnalysisResultEntity])],
   controllers: [UncertaintyAnalysisResultController],
   providers: [UncertaintyAnalysisResultService],
   exports: [UncertaintyAnalysisResultService],
})
export class UncertaintyAnalysisResultModule { }
