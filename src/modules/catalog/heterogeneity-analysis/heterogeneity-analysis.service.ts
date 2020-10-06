import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { HeterogeneityAnalysisEntity } from './heterogeneity-analysis.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class HeterogeneityAnalysisService extends TypeOrmCrudService<HeterogeneityAnalysisEntity>{
   constructor(
      @InjectRepository(HeterogeneityAnalysisEntity) repo: Repository<HeterogeneityAnalysisEntity>,
   ) {
      super(repo);
   }

   async findHeterogeneityAnalysisByIdArray(idArray: number[]): Promise<HeterogeneityAnalysisEntity[]> {
      return await this.repo.findByIds(idArray);
   }
}