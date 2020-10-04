import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';
import { CostBenefitService } from './cost-benefit.service';
import { StudyLocationService } from '../../catalog/study-location/study-location.service';
import { StudyLocationModule } from '../../catalog/study-location/study-location.module';
import { InterventionModule } from '../../catalog/intervention/intervention.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostBenefitEntity]),
    StudyLocationModule, InterventionModule
  ],
  controllers: [],
  providers: [CostBenefitService],
  exports: [CostBenefitService]
})
export class CostBenefitModule { }