import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisMethodEntity } from './analysis-method.entity';
import { AnalysisMethodService } from './analysis-method.service';
import { AnalysisMethodController } from './analysis-method.controller';

@Module({
   imports: [TypeOrmModule.forFeature([AnalysisMethodEntity])],
   controllers: [AnalysisMethodController],
   providers: [AnalysisMethodService],
   exports: [AnalysisMethodService],
})
export class AnalysisMethodModule { }
