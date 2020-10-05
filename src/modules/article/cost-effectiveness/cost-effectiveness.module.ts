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
import { UncertaintyAnalysisModule } from "src/modules/catalog/uncertainty-analysis/uncertainty-analysis.module";
import { ModelTypeModule } from "src/modules/catalog/model-type/model-type.module";

@Module({
   imports: [
      TypeOrmModule.forFeature([CostEffectivenessEntity]),
      StudyLocationModule, InterventionModule,
      ComparatorModule, OutcomeModule,
      ModelTypeModule, HeterogeneityAnalysisModule,
      UncertaintyAnalysisResultModule,
      UncertaintyAnalysisModule
   ],
   controllers: [CostEffectivenessController],
   providers: [CostEffectivenessService],
   exports: [CostEffectivenessService]
})
export class CostEffectivenessModule { }