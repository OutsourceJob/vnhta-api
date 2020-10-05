import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UncertaintyAnalysisResultEntity } from './uncertainty-analysis-result.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class UncertaintyAnalysisResultService extends TypeOrmCrudService<UncertaintyAnalysisResultEntity>{
   constructor(
      @InjectRepository(UncertaintyAnalysisResultEntity) repo: Repository<UncertaintyAnalysisResultEntity>,
   ) {
      super(repo);
   }

   async findUncertaintyAnalysisResultByIdArray(idArray: number[]): Promise<UncertaintyAnalysisResultEntity[]> {
      return await this.repo.findByIds(idArray);
   }
}