import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ParameterEntity } from './parameter.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection } from 'typeorm';

@Injectable()
export class ParameterService extends TypeOrmCrudService<ParameterEntity>{
  constructor(
    @InjectRepository(ParameterEntity) repo: Repository<ParameterEntity>,
    private connection: Connection
  ) {
    super(repo);
  }

  async findParametersByIdArray(idArray: Array<number>): Promise<ParameterEntity[]> {
    return await this.repo.findByIds(idArray)
  }

  async findParameters(): Promise<ParameterEntity[]> {
    return await this.repo.find()
  }

  // async findParametersByCodeArray(codeArray: Array<string>): Promise<ParameterEntity[]> {
  //   // return await this.repo
  // }
}