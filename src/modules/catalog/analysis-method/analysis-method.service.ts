import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AnalysisMethodEntity } from './analysis-method.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class AnalysisMethodService extends TypeOrmCrudService<AnalysisMethodEntity>{
   constructor(
      @InjectRepository(AnalysisMethodEntity) repo: Repository<AnalysisMethodEntity>,
   ) {
      super(repo);
   }
}