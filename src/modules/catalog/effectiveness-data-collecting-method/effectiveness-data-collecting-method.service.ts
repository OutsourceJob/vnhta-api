import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EffectivenessDataCollectingMethodEntity } from './effectiveness-data-collecting-method.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class EffectivenessDataCollectingMethodService extends TypeOrmCrudService<EffectivenessDataCollectingMethodEntity>{
   constructor(
      @InjectRepository(EffectivenessDataCollectingMethodEntity) repo: Repository<EffectivenessDataCollectingMethodEntity>,
   ) {
      super(repo);
   }
}