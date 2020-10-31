import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { EffectivenessTypeEntity } from './effectiveness-type.entity';

@Injectable()
export class EffectivenessTypeService extends TypeOrmCrudService<EffectivenessTypeEntity> {
   constructor(
      @InjectRepository(EffectivenessTypeEntity) repo: Repository<EffectivenessTypeEntity>
   ) {
      super(repo);
   }

   async findEffectivenessTypeByIdArray(idArray: number[]): Promise<EffectivenessTypeEntity[]> {
      return await this.repo.findByIds(idArray);
   }
}
