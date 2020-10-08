import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UncertaintyAnalysisMethodEntity } from './uncertainty-analysis-method.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class UncertaintyAnalysisService extends TypeOrmCrudService<UncertaintyAnalysisMethodEntity>{
   constructor(
      @InjectRepository(UncertaintyAnalysisMethodEntity) repo: Repository<UncertaintyAnalysisMethodEntity>,
   ) {
      super(repo);
   }

   async findUncertaintyAnalysisByIdArray(idArray: number[]): Promise<UncertaintyAnalysisMethodEntity[]> {
      return await this.repo.findByIds(idArray);
   }
}