import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UncertaintyAnalysisEntity } from './uncertainty-analysis.entity';
import { UncertaintyAnalysisService } from './uncertainty-analysis.service';
import { UncertaintyAnalysisController } from './uncertainty-analysis.controller';

@Module({
   imports: [TypeOrmModule.forFeature([UncertaintyAnalysisEntity])],
   controllers: [UncertaintyAnalysisController],
   providers: [UncertaintyAnalysisService],
   exports: [UncertaintyAnalysisService],
})
export class UncertaintyAnalysisModule { }
