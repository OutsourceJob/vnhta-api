import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UncertaintyAnalysisMethodEntity } from './uncertainty-analysis-method.entity';
import { UncertaintyAnalysisService } from './uncertainty-analysis-method.service';
import { UncertaintyAnalysisMethodController } from './uncertainty-analysis-method.controller';

@Module({
   imports: [TypeOrmModule.forFeature([UncertaintyAnalysisMethodEntity])],
   controllers: [UncertaintyAnalysisMethodController],
   providers: [UncertaintyAnalysisService],
   exports: [UncertaintyAnalysisService],
})
export class UncertaintyAnalysisMethodModule { }
