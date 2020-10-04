import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { InterventionEntity } from './intervention.entity';

@Injectable()
export class InterventionService extends TypeOrmCrudService<InterventionEntity>{
  constructor(
    @InjectRepository(InterventionEntity) repo: Repository<InterventionEntity>,
  ) {
    super(repo);
  }

  async findInterventionByIdArray(idArray: number[]): Promise<InterventionEntity[]> {
    return await this.repo.findByIds(idArray);
  }
}