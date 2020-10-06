import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FeatureEntity } from './feature.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class FeatureService extends TypeOrmCrudService<FeatureEntity>{
  constructor(
    @InjectRepository(FeatureEntity) repo: Repository<FeatureEntity>,
  ) {
    super(repo);
  }

  async findFeaturesByIdArray(idArray: Array<number>): Promise<FeatureEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}