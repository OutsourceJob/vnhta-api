import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Icd20Entity } from './icd-20.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class Icd20Service extends TypeOrmCrudService<Icd20Entity>{
  constructor(
    @InjectRepository(Icd20Entity) repo: Repository<Icd20Entity>,
  ) {
    super(repo);
  }

  async findIcd20ByIdArray(idArray: number[]): Promise<Icd20Entity[]> {
    return await this.repo.findByIds(idArray);
  }
}