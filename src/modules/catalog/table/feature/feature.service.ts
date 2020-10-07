import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FeatureEntity } from './feature.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { WriteFeatureDTO } from './feature.dto';

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

  async createFeature(data: WriteFeatureDTO) {
    return await this.repo.create(data).save()
  }

  async createFeatures(data: WriteFeatureDTO[]) {
    return await this.repo.save(
      this.repo.create(data)
    )
  }

  async updateFeatureById() {

  }

  async findFeaturesByRowId(rowId: number) {
    return await this.repo.find({ where: { rowId } })
  }
}