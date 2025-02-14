import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyLocationModule } from '../../catalog/study-location/study-location.module';
import { InterventionModule } from '../../catalog/intervention/intervention.module';
import { CostEffectivenessEntity } from "./cost-effectiveness.entity";
import { CostEffectivenessController } from "./cost-effectiveness.controller";
import { CostEffectivenessService } from "./cost-effectiveness.service";
import { ComparatorModule } from "src/modules/catalog/comparator/comparator.module";
import { OutcomeModule } from "src/modules/catalog/outcome/outcome.module";
import { HeterogeneityAnalysisModule } from "src/modules/catalog/heterogeneity-analysis/heterogeneity-analysis.module";
import { UncertaintyAnalysisResultModule } from "src/modules/catalog/uncertainty-analysis-result/uncertainty-analysis-result.module";
import { UncertaintyAnalysisMethodModule } from "src/modules/catalog/uncertainty-analysis-method/uncertainty-analysis-method.module";
import { ModelTypeModule } from "src/modules/catalog/model-type/model-type.module";
import { TableModule } from '../../catalog/table/table.module';
import { AnalysisMethodModule } from "src/modules/catalog/analysis-method/analysis-method.module";
import { Icd20Module } from '../../catalog/icd-20/icd-20.module';
import { EffectivenessTypeModule } from "src/modules/catalog/effectiveness-type/effectiveness-type.module";

@Module({
   imports: [
      TypeOrmModule.forFeature([CostEffectivenessEntity]),
      StudyLocationModule, InterventionModule,
      ComparatorModule, OutcomeModule,
      ModelTypeModule, HeterogeneityAnalysisModule,
      UncertaintyAnalysisResultModule,
      UncertaintyAnalysisMethodModule,
      TableModule, AnalysisMethodModule,
      Icd20Module, EffectivenessTypeModule,
   ],
   controllers: [CostEffectivenessController],
   providers: [CostEffectivenessService],
   exports: [CostEffectivenessService]
})
export class CostEffectivenessModule { }