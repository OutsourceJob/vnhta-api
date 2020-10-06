import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ParameterEntity } from './parameter.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class ParameterService extends TypeOrmCrudService<ParameterEntity>{
  s
  constructor(
    @InjectRepository(ParameterEntity) repo: Repository<ParameterEntity>,
  ) {
    super(repo);
  }

  async findParametersByIdArray(idArray: Array<number>): Promise<ParameterEntity[]> {
    return await this.repo.findByIds(idArray)
  }
}