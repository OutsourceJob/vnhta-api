import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UncertaintyAnalysisEntity } from './uncertainty-analysis.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class UncertaintyAnalysisService extends TypeOrmCrudService<UncertaintyAnalysisEntity>{
   constructor(
      @InjectRepository(UncertaintyAnalysisEntity) repo: Repository<UncertaintyAnalysisEntity>,
   ) {
      super(repo);
   }

   async findUncertaintyAnalysisByIdArray(idArray: number[]): Promise<UncertaintyAnalysisEntity[]> {
      return await this.repo.findByIds(idArray);
   }
}