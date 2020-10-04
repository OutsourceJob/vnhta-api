import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyLocationModule } from '../../catalog/study-location/study-location.module';
import { InterventionModule } from '../../catalog/intervention/intervention.module';
import { QualityOfLifeService } from "./quality-of-life.service";
import { QualityOfLifeEntity } from "./quality-of-life.entity";

@Module({
   imports: [
      TypeOrmModule.forFeature([QualityOfLifeEntity]),
      StudyLocationModule, InterventionModule
   ],
   controllers: [],
   providers: [QualityOfLifeService],
   exports: [QualityOfLifeService]
})
export class QualityOfLifeModule { }