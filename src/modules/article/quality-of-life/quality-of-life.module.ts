import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyLocationModule } from '../../catalog/study-location/study-location.module';
import { InterventionModule } from '../../catalog/intervention/intervention.module';
import { QualityOfLifeService } from "./quality-of-life.service";
import { QualityOfLifeEntity } from "./quality-of-life.entity";
import { QualityOfLifeController } from './quality-of-life.controller';
import { Icd20Module } from '../../catalog/icd-20/icd-20.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([QualityOfLifeEntity]),
      StudyLocationModule, InterventionModule,
      Icd20Module
   ],
   controllers: [QualityOfLifeController],
   providers: [QualityOfLifeService],
   exports: [QualityOfLifeService]
})
export class QualityOfLifeModule { }