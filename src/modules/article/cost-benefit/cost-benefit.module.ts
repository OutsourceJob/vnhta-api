import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';
import { CostBenefitService } from './cost-benefit.service';
import { StudyLocationService } from '../../catalog/study-location/study-location.service';
import { StudyLocationModule } from '../../catalog/study-location/study-location.module';
import { InterventionModule } from '../../catalog/intervention/intervention.module';
import { CostBenefitController } from './cost-benefit.controller';
import { TableModule } from '../../catalog/table/table.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostBenefitEntity]),
    StudyLocationModule, InterventionModule,
    TableModule
  ],
  controllers: [CostBenefitController],
  providers: [CostBenefitService],
  exports: [CostBenefitService]
})
export class CostBenefitModule { }