import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ModelTypeEntity } from './model-type.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class ModelTypeService extends TypeOrmCrudService<ModelTypeEntity>{
   constructor(
      @InjectRepository(ModelTypeEntity) repo: Repository<ModelTypeEntity>,
   ) {
      super(repo);
   }
}